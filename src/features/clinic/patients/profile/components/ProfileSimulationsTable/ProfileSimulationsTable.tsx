import { useCopyToClipboard } from "usehooks-ts";
import { useTheme } from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React, { useMemo, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { PaginationProps } from "antd/es/pagination/Pagination";
import { Table } from "antd";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { ModelSimulation } from "@services/Simulation/interfaces/ModelSimulation.interface";
import { Patient } from "@services/Patients/interfaces/Patient.interface";
import { ModelImage } from "@services/ModelImage/interfaces/ModelImage.interface";
import { Model } from "@services/Model/interfaces/Model.interface";
import { ClinicBrief } from "@services/Clinic/interfaces/Clinic.interface";
import { useUpdateSimulationFieldsMutation } from "@hooks/query/simulation/useUpdateSimulationFieldsMutation";
import { useGetModelByIdQuery } from "@hooks/query/model/useGetModelByIdQuery";
import { useGetClinicQuery } from "@hooks/query/clinic/useGetClinicQuery";
import { DEFAULT_TOAST_OPTIONS, Toast } from "@helpers/toast";
import { getSimulationLink } from "@helpers/getAppUrls/getSimulationLink";
import { getImageUrlById } from "@helpers/getAppUrls/getImageUrlById";
import { formatDate } from "@helpers/formatDate";
import { IProfileSimulationsData } from "@features/clinic/patients/profile/components/ProfileSimulationsTable/interfaces/ProfileSimulationsData.inteface";
import { API_SERVICES, CLINIC_STORAGE_KEY, ROUTES } from "@config/constants";
import { Title } from "@components/Title/Title";
import { Switch } from "@components/Switch/styled/Switch.styled";
import { SpinnerIcon } from "@components/Spinner/components/SpinnerIcon/SpinnerIcon";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { Pagination } from "@components/Pagination/styled/Pagination.styled";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonPrimaryOutlined } from "@components/Button/styled/ButtonPrimaryOutlined.styled";
import { ButtonPrimary } from "@components/Button/styled/ButtonPrimary.styled";
import { ButtonIcon } from "@components/Button/styled/ButtonIcon.styled";

export const ProfileSimulationsTable = ({
  patient,
  selectedModelId
}: {
  patient?: Patient;
  selectedModelId: string;
}) => {
  const theme = useTheme();
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10
  });

  const { data: model, isLoading: isModelLoading } =
    useGetModelByIdQuery(selectedModelId);

  const navigate = useNavigate();

  const [, copyToClipboard] = useCopyToClipboard();

  const modelSimulations = useMemo(() => {
    return model?.modelImages?.flatMap((modelImage: ModelImage) => {
      return modelImage?.simulations;
    });
  }, [model]);

  const isLoadingData = useMemo(() => {
    return isModelLoading || !patient;
  }, [patient, isModelLoading]);

  const updateModelSimulationFieldsMutation =
    useUpdateSimulationFieldsMutation();

  const queryClient = useQueryClient();

  const copySimulationLinkToClipboard = async (simulation: ModelSimulation) => {
    if (patient) {
      const simulationLink = getSimulationLink(patient?.id, simulation?.id);

      await copyToClipboard(simulationLink);

      Toast.success(
        "The link to the simulation has been copied to the clipboard!"
      );
    }
  };

  const handleChangeVisibilityToPatient = async (
    state: boolean,
    simulation: ModelSimulation
  ) => {
    updateModelSimulationFieldsMutation(
      {
        ...simulation,
        is_active: state
      },
      {
        onSuccess: () => {
          // console.log(
          //   `Simulation visibility to patient has been changed to ${state} successfully!`
          // );

          queryClient.invalidateQueries({
            predicate: (query) =>
              query.queryKey.includes(API_SERVICES.MODEL.invalidationKey)
          });
        }
      }
    );
  };

  const handleConfirmDeleteSimulation = (simulation: ModelSimulation) => {
    updateModelSimulationFieldsMutation(
      {
        id: simulation.id,
        is_deleted: true
      },
      {
        onSuccess: () => {
          Toast.success(`Simulation has been deleted successfully!`);

          queryClient.invalidateQueries({
            predicate: (query) =>
              query.queryKey.includes(API_SERVICES.MODEL.invalidationKey)
          });
        }
      }
    );
  };

  const handleDeleteSimulation = (simulation: ModelSimulation) => {
    const toastId = toast(
      <GroupItems>
        <Paragraph>Are you sure want to delete simulation?</Paragraph>

        <FlexGroup center centerY>
          <ButtonPrimaryOutlined
            onClick={() => {
              toast.dismiss(toastId);
            }}
            color={"#fff"}
            style={{ width: "auto", fontWeight: 400 }}
          >
            Cancel
          </ButtonPrimaryOutlined>

          <ButtonPrimary
            onClick={() => {
              handleConfirmDeleteSimulation(simulation);
            }}
          >
            Delete
          </ButtonPrimary>
        </FlexGroup>
      </GroupItems>,
      DEFAULT_TOAST_OPTIONS
    );
  };

  const PROFILE_SIMULATIONS_TABLE_COLUMNS: ColumnsType<IProfileSimulationsData> =
    [
      {
        title: "Before & after",
        dataIndex: "photo",
        width: "20%"
      },
      {
        title: "Simulation Name",
        dataIndex: "simulation",
        width: "20%"
      },
      {
        title: "Date Created",
        dataIndex: "dateCreated"
      },
      {
        title: "Visibility",
        dataIndex: "visibility"
      },
      // {
      //   title: "Last opened",
      //   dataIndex: "lastOpened"
      // },
      {
        title: (
          <ButtonPrimary
            type="link"
            disabled={
              modelSimulations?.filter((simulation) => !simulation.is_deleted)
                ?.length === 0 || !modelSimulations
            }
            onClick={() => {
              if (patient) {
                navigate(ROUTES.PREVIEW_ALL_SIMULATION_BY_ID(patient.id));
              }
            }}
          >
            Preview all
          </ButtonPrimary>
        ),
        dataIndex: "actions"
      }
    ];

  const data: IProfileSimulationsData[] = useMemo(() => {
    return (
      modelSimulations
        ?.filter((simulation) => !simulation.is_deleted)
        ?.map((simulation) => {
          const modelImage = model?.modelImages?.find(
            (modelImage) => modelImage.id === simulation?.model_image
          );

          return {
            key: simulation?.id,
            photo: (
              <FlexGroup gap={10}>
                <StyledImage
                  style={{
                    width: 127,
                    maxWidth: "initial",
                    borderRadius: 14,
                    overflow: "hidden"
                  }}
                  imageStyles={{ objectFit: "contain" }}
                  src={getImageUrlById(modelImage?.image as string)}
                  errorAltImages={[
                    getImageUrlById(modelImage?.image as string, false)
                  ]}
                />

                <StyledImage
                  style={{
                    width: 127,
                    maxWidth: "initial",
                    borderRadius: 14,
                    overflow: "hidden"
                  }}
                  imageStyles={{ objectFit: "contain" }}
                  src={simulation?.image?.image}
                />
              </FlexGroup>
            ),
            simulation: (
              <>
                <Title level={3}>{simulation?.name}</Title>
                <Paragraph size={"md"}>{simulation?.description}</Paragraph>
              </>
            ),
            dateCreated: formatDate(new Date(simulation?.createdAt)),
            visibility: (
              <FlexGroup centerY>
                <Paragraph size={"md"}>Visible to patient</Paragraph>
                <Switch
                  defaultChecked={simulation?.is_active}
                  onChange={(state) => {
                    handleChangeVisibilityToPatient(state, simulation);
                  }}
                />
              </FlexGroup>
            ),
            actions: (
              <FlexGroup alignItems={"end"} column spread>
                <FlexGroup>
                  <ButtonIcon
                    $buttonIconBg
                    iconName="common/link"
                    iconStyle={{ width: 16, height: 16 }}
                    onClick={() => copySimulationLinkToClipboard(simulation)}
                  />

                  <ButtonPrimaryOutlined
                    style={{ width: "100%" }}
                    onClick={() => {
                      navigate(
                        ROUTES.PREVIEW_SIMULATION_BY_ID(
                          patient?.id as string,
                          simulation.id
                        )
                      );
                    }}
                  >
                    Preview
                  </ButtonPrimaryOutlined>
                </FlexGroup>

                <ButtonIcon
                  mt={90}
                  iconName="button/garbage"
                  color={theme.colors.nobel}
                  onClick={() => {
                    handleDeleteSimulation(simulation);
                  }}
                />
              </FlexGroup>
            )
          } as IProfileSimulationsData;
        }) || []
    );
  }, [patient, modelSimulations]);

  const tableLoading = isLoadingData ? { indicator: <SpinnerIcon /> } : false;

  return (
    <>
      <Table
        columns={PROFILE_SIMULATIONS_TABLE_COLUMNS}
        dataSource={data}
        loading={isLoadingData ? { indicator: <SpinnerIcon /> } : false}
        locale={tableLoading ? { emptyText: " " } : undefined}
        pagination={{
          ...pagination,
          total: data.length
        }}
        scroll={{ x: true }}
        rootClassName={"profile-simulations"}
        tableLayout="fixed"
      />

      <Pagination
        // wrapperStyles={{ "--pagination-offset": "20px" }}
        isPaginationLoading={isLoadingData}
        onChange={(currentPage, pageSize) => {
          setPagination({ current: currentPage, pageSize: pageSize });
        }}
        total={data.length}
      />
    </>
  );
};
