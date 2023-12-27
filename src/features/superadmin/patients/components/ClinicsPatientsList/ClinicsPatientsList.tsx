import { useTheme } from "styled-components";
import { useUpdateEffect } from "react-use";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import { PaginationProps } from "antd/es/pagination/Pagination";
import { Table } from "antd";
import { useSwitchRole } from "@hooks/useSwitchRole";
import { useDebounceEffect } from "@hooks/useDebounceEffect";
import { useGetPatientsQuery } from "@hooks/query/patients/useGetPatientsQuery";
import { getImageUrlById } from "@helpers/getAppUrls/getImageUrlById";
import { formatDate } from "@helpers/formatDate";
import {
  CLINICS_PATIENTS_TABLE_COLUMNS,
  FilterOptions,
  IClinicsPatientsData,
  ROUTES,
  VIEWMODS
} from "@config/constants";
import { Title } from "@components/Title/Title";
import { SpinnerIcon } from "@components/Spinner/components/SpinnerIcon/SpinnerIcon";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { Pagination } from "@components/Pagination/styled/Pagination.styled";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonPrimaryOutlined } from "@components/Button/styled/ButtonPrimaryOutlined.styled";

export const ClinicsPatientsList = ({
  searchValue,
  ordering,
  tabView
}: {
  searchValue: string;
  ordering: string;
  tabView: string;
}) => {
  const theme = useTheme();
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10
  });
  const navigate = useNavigate();

  const {
    data: patientData,
    isLoading: isLoadingPatients,
    isFetching
  } = useGetPatientsQuery({
    ordering: FilterOptions[0].value,
    type: tabView,
    search: searchValue,
    offset: (Number(pagination?.current) - 1) * Number(pagination?.pageSize),
    limit: pagination.pageSize,
    allClinics: true
  });

  const totalCount = useMemo(() => {
    return patientData?.count || 0;
  }, [patientData]);

  const patients = useMemo(() => patientData?.results || [], [patientData]);

  const [data, setData] = useState<IClinicsPatientsData[]>([]);

  const switchRole = useSwitchRole();

  const handleSetPatientsData = async () => {
    setData(
      patients.map((patient) => {
        return {
          key: patient.id,
          photo: (
            <StyledImage
              style={{
                width: 60,
                borderRadius: theme.general.borderRadius,
                overflow: "hidden"
              }}
              src={
                patient.default_image_url ||
                patient?.patientModels?.at(0)?.modelImages?.at(0)?.originalImage
                  ?.image ||
                getImageUrlById(
                  patient?.patientModels?.at(0)?.modelImages?.at(0)
                    ?.image as string
                )
              }
            />
          ),
          clinic: (
            <>
              <Paragraph color={"malibuLight"}>{patient.clinicName}</Paragraph>

              <Paragraph>Hair transplant</Paragraph>
            </>
          ),
          info: (
            <>
              <Title level={2}>{patient.name}</Title>
              <Paragraph>{patient.type}</Paragraph>
            </>
          ),
          created: formatDate(new Date(patient.createdAt)),
          photos: 2,
          simulations: patient.simulations.length,
          // sessions: 24,
          // lastOpened: formatDate(new Date()),
          actions: (
            <FlexGroup center>
              <ButtonPrimaryOutlined
                onClick={() => {
                  switchRole({
                    viewMode: VIEWMODS.CLINIC,
                    clinicId: patient.clinic
                  });

                  navigate(ROUTES.VIEW_PATIENT_BY_ID(patient.id));
                }}
                style={{ alignSelf: "center", width: "100%" }}
              >
                Profile
              </ButtonPrimaryOutlined>
            </FlexGroup>
          )
        } as IClinicsPatientsData;
      })
    );
  };

  useEffect(() => {
    handleSetPatientsData();
  }, [patients]);

  useDebounceEffect(
    () => {
      handleSetPatientsData();
    },
    500,
    [searchValue, ordering, tabView]
  );

  useUpdateEffect(() => {
    setPagination({ current: 1, pageSize: 10 });
  }, [searchValue, ordering, tabView]);

  const tableLoading =
    isLoadingPatients || isFetching ? { indicator: <SpinnerIcon /> } : false;

  return (
    <>
      <Table
        columns={CLINICS_PATIENTS_TABLE_COLUMNS}
        dataSource={data}
        pagination={{
          ...pagination,
          total: data.length
        }}
        loading={tableLoading}
        scroll={{ x: true }}
        tableLayout="fixed"
        locale={tableLoading ? { emptyText: " " } : undefined}
      />

      <Pagination
        isPaginationLoading={isLoadingPatients || isFetching}
        onChange={(currentPage, pageSize) => {
          setPagination({ current: currentPage, pageSize: pageSize });
        }}
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={totalCount || data.length}
      />
    </>
  );
};
