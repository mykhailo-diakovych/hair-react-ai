import { useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import { PaginationProps } from "antd/es/pagination/Pagination";
import { Table } from "antd";
import { ModelSimulation } from "@services/Simulation/interfaces/ModelSimulation.interface";
import { useSwitchRole } from "@hooks/useSwitchRole";
import { useDebounceEffect } from "@hooks/useDebounceEffect";
import { useGetModelSimulationsQuery } from "@hooks/query/simulation/useGetModelSimulationsQuery";
import { getImageUrlById } from "@helpers/getAppUrls/getImageUrlById";
import { formatDate } from "@helpers/formatDate";
import {
  CLINICS_SIMULATIONS_TABLE_COLUMNS,
  FilterOptions,
  IClinicSimulationData,
  ROUTES,
  VIEWMODS
} from "@config/constants";
import { Title } from "@components/Title/Title";
import { SpinnerIcon } from "@components/Spinner/components/SpinnerIcon/SpinnerIcon";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { Pagination } from "@components/Pagination/styled/Pagination.styled";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonPrimaryOutlined } from "@components/Button/styled/ButtonPrimaryOutlined.styled";

import { SimulationStatus } from "../../../../../../../types/SimulationStatus.enum";

export const ClinicsSimulationsList = ({
  searchValue,
  ordering,
  tabView
}: {
  searchValue: string;
  ordering: string;
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
    isFetching
  } = useGetModelSimulationsQuery({
    ordering: FilterOptions[0].value,
    image__patient__type: tabView,
    // search: searchValue,
    is_deleted: false,
    offset: (Number(pagination?.current) - 1) * Number(pagination?.pageSize),
    limit: pagination.pageSize,
    status: SimulationStatus.SUCCESS
  });

  const simulations = useMemo(
    () => simulationsData?.results || [],
    [simulationsData]
  );

  const [data, setData] = useState<IClinicSimulationData[]>([]);

  const switchRole = useSwitchRole();

  const handlePreviewSimulationClick = async (simulation: ModelSimulation) => {
    navigate(
      ROUTES.PREVIEW_SIMULATION_BY_ID(simulation.patient_id, simulation.id)
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
              <Title level={2}>{simulation?.name}</Title>
              <Paragraph>{simulation?.description}</Paragraph>
              <Paragraph color="gray400">
                Type: {simulation?.patient_type}
              </Paragraph>
              <Paragraph color="mineshaft3">
                {simulation?.patient_name}
              </Paragraph>
              <Paragraph color="malibuLight">
                {simulation?.clinic_name || ""}
              </Paragraph>
              <Paragraph>Hair transplant</Paragraph>
            </>
          ),
          created: formatDate(new Date(simulation.createdAt)),
          simulations: 1,
          // sessions: sessionsCount,
          // lastOpened: formatDate(new Date()),
          actions: (
            <GroupItems gridTemplateColumns="repeat(auto-fit, minmax(130px, 1fr))">
              <ButtonPrimaryOutlined
                onClick={() => {
                  switchRole({
                    viewMode: VIEWMODS.CLINIC,
                    clinicId: simulation.image?.clinic
                  });

                  navigate(ROUTES.VIEW_PATIENT_BY_ID(simulation?.patient_id));
                }}
              >
                View Patient
              </ButtonPrimaryOutlined>

              <ButtonPrimaryOutlined
                onClick={() => {
                  switchRole({
                    viewMode: VIEWMODS.CLINIC,
                    clinicId: simulation.image?.clinic
                  });

                  handlePreviewSimulationClick(simulation);
                }}
              >
                View Simulation
              </ButtonPrimaryOutlined>
            </GroupItems>
          )
        };
      })
    );
  };

  useEffect(() => {
    handleSetSimulationData();
  }, [simulations]);

  useDebounceEffect(
    () => {
      handleSetSimulationData();
    },
    1000,
    [searchValue, ordering, tabView]
  );

  const tableLoading =
    isLoadingData || isFetching ? { indicator: <SpinnerIcon /> } : false;

  return (
    <>
      <Table
        columns={CLINICS_SIMULATIONS_TABLE_COLUMNS}
        dataSource={data}
        pagination={{
          ...pagination,
          total: data.length
        }}
        loading={tableLoading}
        locale={tableLoading ? { emptyText: " " } : undefined}
        scroll={{ x: true }}
        tableLayout="fixed"
      />

      <Pagination
        isPaginationLoading={isLoadingData}
        onChange={(currentPage, pageSize) => {
          setPagination({ current: currentPage, pageSize: pageSize });
        }}
        total={simulationsData?.count}
      />
    </>
  );
};
