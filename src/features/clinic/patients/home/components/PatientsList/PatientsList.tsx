import { useTheme } from "styled-components";
import { useUpdateEffect } from "react-use";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import { PaginationProps } from "antd/es/pagination/Pagination";
import { Table } from "antd";
import { useGetPatientsQuery } from "@hooks/query/patients/useGetPatientsQuery";
import { getImageUrlById } from "@helpers/getAppUrls/getImageUrlById";
import { formatDate } from "@helpers/formatDate";
import {
  FilterOptions,
  IPatientsData,
  PATIENTS_TABLE_COLUMNS,
  ROUTES
} from "@config/constants";
import { Title } from "@components/Title/Title";
import { SpinnerIcon } from "@components/Spinner/components/SpinnerIcon/SpinnerIcon";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { Pagination } from "@components/Pagination/styled/Pagination.styled";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonPrimaryOutlined } from "@components/Button/styled/ButtonPrimaryOutlined.styled";

export const PatientsList = ({
  searchValue,
  tabView
}: {
  searchValue: string;
  tabView: string;
}) => {
  const theme = useTheme();

  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10
  });

  const navigate = useNavigate();

  const {
    data: patientData,
    isLoading: isLoadingPatients,
    isFetching,
    refetch
  } = useGetPatientsQuery({
    ordering: FilterOptions[0].value,
    type: tabView,
    search: searchValue,
    offset: (Number(pagination?.current) - 1) * Number(pagination?.pageSize),
    limit: pagination.pageSize
  });

  const patients = patientData?.results || [];

  const data: IPatientsData[] = useMemo(() => {
    setTotalCount(patientData?.count || 0);

    return patients.map((patient) => {
      const simulationsCount = patient?.patientModels
        .flatMap((model) =>
          model.modelImages?.flatMap((modelImage) => modelImage.simulations)
        )
        .filter((simulation) => !simulation?.is_deleted).length;

      return {
        key: patient.id,
        photo: (
          <StyledImage
            style={{
              width: 60,
              aspectRatio: "3/4",
              borderRadius: theme.general.borderRadius,
              overflow: "hidden"
            }}
            imageStyles={{
              width: "60px",
              height: "80px"
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
        info: (
          <>
            <Title level={2}>{patient.name}</Title>
            <Paragraph>{patient.type}</Paragraph>
          </>
        ),
        created: formatDate(new Date(patient.createdAt)),
        photos: patient.images.length,
        simulations: simulationsCount,
        // sessions: 24,
        // lastOpened: formatDate(new Date()),
        actions: (
          <FlexGroup center>
            <ButtonPrimaryOutlined
              onClick={() => {
                navigate(ROUTES.VIEW_PATIENT_BY_ID(patient.id));
              }}
              style={{ alignSelf: "center", width: "100%" }}
            >
              Preview
            </ButtonPrimaryOutlined>
          </FlexGroup>
        )
      } as IPatientsData;
    });
  }, [patientData, isLoadingPatients]);

  useEffect(() => {
    refetch();
  }, []);

  useUpdateEffect(() => {
    setPagination({ current: 1, pageSize: 10 });
  }, [searchValue, tabView]);

  const tableLoading =
    isLoadingPatients || isFetching ? { indicator: <SpinnerIcon /> } : false;

  return (
    <>
      <Table
        columns={PATIENTS_TABLE_COLUMNS}
        dataSource={data}
        loading={tableLoading}
        locale={tableLoading ? { emptyText: " " } : undefined}
        pagination={{
          ...pagination,
          total: patients.length
        }}
        scroll={{ x: true }}
        tableLayout="fixed"
      />

      <Pagination
        isPaginationLoading={isLoadingPatients || isFetching}
        onChange={(currentPage, pageSize) => {
          setPagination({ current: currentPage, pageSize: pageSize });
        }}
        total={totalCount || patients?.length}
        current={pagination.current}
        pageSize={pagination.pageSize}
      />
    </>
  );
};
