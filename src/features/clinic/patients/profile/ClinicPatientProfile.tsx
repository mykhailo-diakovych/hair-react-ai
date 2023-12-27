import { useTheme } from "styled-components";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import { ClinicBrief } from "@services/Clinic/interfaces/Clinic.interface";
import { useSwitchRole } from "@hooks/useSwitchRole";
import { useAuthentication } from "@hooks/useAuthentication";
import { useGetPatientQuery } from "@hooks/query/patients/useGetPatientQuery";
import { useGetClinicQuery } from "@hooks/query/clinic/useGetClinicQuery";
import {
  ProfileContainer,
  ProfileContainerInner
} from "@features/clinic/patients/profile/styled/ProfileContainer.styled";
import { UploadPhotoList } from "@features/clinic/patients/profile/components/UploadPhotoList/UploadPhotoList";
import { ProfileStatistics } from "@features/clinic/patients/profile/components/ProfileStatistics/styled/ProfileStatistics.styled";
import { ProfileSimulationsTable } from "@features/clinic/patients/profile/components/ProfileSimulationsTable/ProfileSimulationsTable";
import { ProfileSectionHeader } from "@features/clinic/patients/profile/components/ProfileSectionHeader/ProfileSectionHeader";
import { ProfileModels } from "@features/clinic/patients/profile/components/ProfileModels/ProfileModels";
import { CreateNewModel } from "@features/clinic/patients/profile/components/CreateNewModel/CreateNewModel";
import { ClinicEditPatientInfo } from "@features/clinic/patients/info/edit/ClinicEditPatientInfo";
import { queryClient } from "@config/query";
import {
  API_SERVICES,
  CLINIC_STORAGE_KEY,
  ROUTES,
  VIEWMODS
} from "@config/constants";
import { Theme } from "@components/Theme/Theme";
import { SiteWrapper } from "@components/SiteWrapper/SiteWrapper";
import { Sidebar } from "@components/Sidebar/styled/Sidebar.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { Modal } from "@components/Modal/styled/Modal.styled";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { Divider } from "@components/Divider/styled/Divider.styled";
import { ButtonPrimaryOutlined } from "@components/Button/styled/ButtonPrimaryOutlined.styled";
import { ButtonPrimary } from "@components/Button/styled/ButtonPrimary.styled";
import { BreadcrumbsStyled } from "@components/Breadcrumbs/styled/Breadcrumbs.styled";

export const ClinicPatientProfile = () => {
  const [showEditInfoModal, setShowEditInfoModal] = useState(false);
  const [showCreateNewModel, setShowCreateNewModel] = useState(false);

  const { id } = useParams() as { id: string };
  const {
    data: patient,
    refetch: refetchPatient,
    isLoading,
    isFetching
  } = useGetPatientQuery(id);

  const { isAdmin } = useAuthentication();

  const theme = useTheme();

  const switchRole = useSwitchRole();

  const clinicId = localStorage.getItem(CLINIC_STORAGE_KEY) as string;

  const { data: clinic } = useGetClinicQuery<unknown, ClinicBrief>(
    clinicId,
    true
  );

  const [selectedModelId, setSelectedModelId] = useState("");

  const simulationsCount = useMemo(() => {
    return patient?.patientModels
      .flatMap((model) =>
        model.modelImages?.flatMap((modelImage) => modelImage.simulations)
      )
      .filter((simulation) => !simulation?.is_deleted).length;
  }, [patient]);

  useEffect(() => {
    if (patient) {
      setSelectedModelId(patient?.patientModels.at(0)?.id || "");
    }
  }, [patient, id]);

  return (
    <SiteWrapper>
      <Sidebar />

      <ProfileContainer>
        <ProfileContainerInner
          column
          bg={"white"}
          gap={10}
          style={{
            borderRadius: 16
          }}
        >
          <FlexGroup flexWrap={"wrap"} compact centerY spread>
            <BreadcrumbsStyled
              items={
                isAdmin
                  ? [
                      {
                        title: (
                          <Link
                            to={ROUTES.CLINIC_PATIENTS}
                            onClick={() => {
                              switchRole({ viewMode: VIEWMODS.SUPERADMIN });
                            }}
                          >
                            <Paragraph>Super admin</Paragraph>
                          </Link>
                        )
                      },
                      {
                        title: (
                          <Link
                            to={ROUTES.CLINICS}
                            onClick={() => {
                              switchRole({ viewMode: VIEWMODS.SUPERADMIN });
                            }}
                          >
                            <Paragraph>{clinic?.name}</Paragraph>
                          </Link>
                        )
                      },
                      {
                        title: (
                          <Link to={ROUTES.CLINIC_PATIENTS}>
                            <Paragraph>Profiles</Paragraph>
                          </Link>
                        )
                      },
                      {
                        title: <Paragraph>{patient?.name}</Paragraph>
                      }
                    ]
                  : [
                      {
                        title: (
                          <Link to={ROUTES.CLINIC_PATIENTS}>
                            <Paragraph>Profiles</Paragraph>
                          </Link>
                        )
                      },
                      {
                        title: <Paragraph>{patient?.name}</Paragraph>
                      }
                    ]
              }
            />

            <FlexGroup flexWrap={"wrap"} compact>
              <FlexGroup flexWrap={"wrap"} compact centerY>
                <ProfileStatistics
                  label="Simulations"
                  value={simulationsCount || 0}
                />
                {/*<ProfileStatistics label="Sessions" value={0} />*/}
              </FlexGroup>

              <ButtonPrimaryOutlined
                disabled={!patient}
                onClick={() => {
                  setShowEditInfoModal(true);
                }}
              >
                View patient info
              </ButtonPrimaryOutlined>
            </FlexGroup>
          </FlexGroup>

          <Divider $width={1} $color={theme.colors.mystic} />

          <GroupItems>
            <ProfileSectionHeader
              title={`${patient?.name || "Patient"}’s photo`}
            />

            <UploadPhotoList
              patient={patient}
              isLoading={isLoading}
              isFetching={isFetching}
            />
          </GroupItems>

          <Divider $width={1} $color={theme.colors.mystic} />

          <FlexGroup column>
            <ProfileSectionHeader
              title="Patient’s model"
              subTitle={"Choose model to see simulation from it"}
              additionalContent={
                <ButtonPrimary
                  disabled={patient?.images?.length === 0}
                  onClick={() => {
                    queryClient.invalidateQueries({
                      predicate: (query) =>
                        query.queryKey.includes(
                          API_SERVICES.PATIENTS.invalidationKey
                        )
                    });

                    setShowCreateNewModel(true);
                  }}
                  style={{ width: "auto" }}
                >
                  Create new model
                </ButtonPrimary>
              }
            />

            <ProfileModels
              patient={patient}
              selectedModelId={selectedModelId}
              setSelectedModelId={setSelectedModelId}
            />
          </FlexGroup>

          <FlexGroup column gap={0}>
            <ProfileSimulationsTable
              patient={patient}
              selectedModelId={selectedModelId}
            />
          </FlexGroup>

          <Modal
            title={"Patient info"}
            isOpen={showEditInfoModal}
            setIsOpen={setShowEditInfoModal}
            maxWidth={440}
          >
            <ClinicEditPatientInfo
              patientId={id}
              patient={patient}
              setOpenEditPatientModal={setShowEditInfoModal}
            />
          </Modal>

          <Theme darkMode>
            <Modal
              isOpen={showCreateNewModel}
              setIsOpen={setShowCreateNewModel}
              title={"Create new model"}
            >
              <CreateNewModel
                closeModal={() => {
                  refetchPatient();
                  setShowCreateNewModel(false);
                }}
              />
            </Modal>
          </Theme>
        </ProfileContainerInner>
      </ProfileContainer>
    </SiteWrapper>
  );
};
