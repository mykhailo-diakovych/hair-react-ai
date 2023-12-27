import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { PaginationProps } from "antd/es/pagination/Pagination";
import { Table } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { Simulation } from "@services/Simulation/interfaces/Simulation.interface";
import { ModelSimulation } from "@services/Simulation/interfaces/ModelSimulation.interface";
import { useDebounceEffect } from "@hooks/useDebounceEffect";
import { useUpdateSimulationFieldsMutation } from "@hooks/query/simulation/useUpdateSimulationFieldsMutation";
import { useGetModelSimulationsQuery } from "@hooks/query/simulation/useGetModelSimulationsQuery";
import { Toast } from "@helpers/toast";
import { getImageUrlById } from "@helpers/getAppUrls/getImageUrlById";
import { formatDate } from "@helpers/formatDate";
import {
  API_SERVICES,
  CLINIC_STORAGE_KEY,
  FilterOptions,
  ISimulationData,
  ROUTES,
  SIMULATIONS_TABLE_COLUMNS
} from "@config/constants";
import { Title } from "@components/Title/Title";
import { Switch } from "@components/Switch/styled/Switch.styled";
import { SpinnerIcon } from "@components/Spinner/components/SpinnerIcon/SpinnerIcon";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { Pagination } from "@components/Pagination/styled/Pagination.styled";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonPrimaryOutlined } from "@components/Button/styled/ButtonPrimaryOutlined.styled";

import { SimulationStatus } from "../../../../../../../types/SimulationStatus.enum";

export const SimulationsList = ({
  searchValue,
  tabView
}: {
  searchValue: string;
  tabView: string;
}) => {
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10
  });

  const navigate = useNavigate();

  const {
    data: simulationsData,
    isLoading: isLoadingData,
    isFetching,
    refetch
  } = useGetModelSimulationsQuery({
    ordering: FilterOptions[0].value,
    image__patient__type: tabView,
    image__clinic: localStorage.getItem(CLINIC_STORAGE_KEY) as string,
    // search: searchValue,
    is_deleted: false,
    offset: (Number(pagination?.current) - 1) * Number(pagination?.pageSize),
    limit: pagination.pageSize,
    status: SimulationStatus.SUCCESS
  });

  const simulations = simulationsData?.results || [];

  const [data, setData] = useState<ISimulationData[]>([]);

  const queryClient = useQueryClient();
  const updateModelSimulationFieldsMutation =
    useUpdateSimulationFieldsMutation();

  const handlePreviewSimulationClick = async (
    patientId: string,
    simulation: Simulation | ModelSimulation
  ) => {
    navigate(ROUTES.PREVIEW_SIMULATION_BY_ID(patientId, simulation.id));
  };

  const handleUpdateSimulationVisibility = async (
    simulation: ModelSimulation
  ) => {
    updateModelSimulationFieldsMutation(
      {
        id: simulation?.id,
        is_active: !simulation.is_active
      },
      {
        onSuccess: () => {
          Toast.success(
            `Simulation visibility has been changed to ${!simulation.is_active} successfully`
          );

          queryClient.invalidateQueries({
            predicate: (query) =>
              query.queryKey.includes(API_SERVICES.SIMULATIONS.invalidationKey)
          });
        }
      }
    );
  };

  const handleSetSimulationData = async () => {
    setData(
      simulations.map((simulation) => {
        const originalImage =
          simulation?.original_image_url ||
          getImageUrlById(simulation?.image?.parent as string);

        const simulationImage = (simulation as ModelSimulation)?.image?.image;

        return {
          key: simulation.id,
          photoAndSimulation: (
            <FlexGroup gap={10}>
              <StyledImage
                style={{
                  width: 127,
                  maxWidth: "initial",
                  borderRadius: 14,
                  overflow: "hidden"
                }}
                src={originalImage}
              />
              <StyledImage
                style={{
                  width: 127,
                  maxWidth: "initial",
                  borderRadius: 14,
                  overflow: "hidden"
                }}
                src={simulationImage}
              />
            </FlexGroup>
          ),
          info: (
            <>
              <Title level={2}>{simulation?.patient_name || ""}</Title>
              <Paragraph color="gray400">
                Type: {simulation?.patient_type || ""}
              </Paragraph>
            </>
          ),
          title: (
            <>
              <Paragraph>{simulation?.name}</Paragraph>
              <Paragraph color="mineshaft3">
                {simulation?.patient_name || ""}
              </Paragraph>
            </>
          ),
          visibility: (
            <Switch
              defaultChecked={
                (simulation as ModelSimulation)?.is_active || false
              }
              onChange={() => {
                handleUpdateSimulationVisibility(simulation);
              }}
            />
          ),
          created: formatDate(new Date(simulation.createdAt)),
          // lastOpened: formatDate(new Date()),
          actions: (
            <GroupItems gridTemplateColumns="repeat(auto-fit, minmax(130px, 1fr))">
              <ButtonPrimaryOutlined
                onClick={() => {
                  navigate(ROUTES.VIEW_PATIENT_BY_ID(simulation?.patient_id));
                }}
              >
                Profile
              </ButtonPrimaryOutlined>

              <ButtonPrimaryOutlined
                onClick={() => {
                  handlePreviewSimulationClick(
                    simulation?.patient_id,
                    simulation
                  );
                }}
              >
                Simulation
              </ButtonPrimaryOutlined>
            </GroupItems>
          )
        };
      })
    );
  };

  useEffect(() => {
    if (isLoadingData || isFetching) return;

    handleSetSimulationData();
  }, [isLoadingData, isFetching, pagination.current]);

  // useDebounceEffect(
  //   () => {
  //     refetch();
  //   },
  //   500,
  //   [searchValue]
  // );

  const tableLoading =
    isLoadingData || isFetching ? { indicator: <SpinnerIcon /> } : false;

  return (
    <>
      <Table
        columns={SIMULATIONS_TABLE_COLUMNS}
        dataSource={data}
        loading={tableLoading}
        locale={tableLoading ? { emptyText: " " } : undefined}
        pagination={{
          ...pagination,
          total: data.length
        }}
        scroll={{ x: true }}
        tableLayout="fixed"
      />

      <Pagination
        isPaginationLoading={isLoadingData || isFetching}
        onChange={(currentPage, pageSize) => {
          setPagination({ current: currentPage, pageSize: pageSize });
        }}
        total={simulationsData?.count}
      />
    </>
  );
};
