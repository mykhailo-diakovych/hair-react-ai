import { useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import { PaginationProps } from "antd/es/pagination/Pagination";
import { Table } from "antd";
import { useSwitchRole } from "@hooks/useSwitchRole";
import { useDebounceEffect } from "@hooks/useDebounceEffect";
import { useGetAllClinicsQuery } from "@hooks/query/clinic/useGetAllClinicsQuery";
import { getImageUrl } from "@helpers/getImageUrl";
import { formatDate } from "@helpers/formatDate";
import {
  CLINICS_TABLE_COLUMNS,
  IClinicsData,
  ROUTES,
  VIEWMODS
} from "@config/constants";
import { Title } from "@components/Title/Title";
import { SpinnerIcon } from "@components/Spinner/components/SpinnerIcon/SpinnerIcon";
import { Pagination } from "@components/Pagination/styled/Pagination.styled";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonPrimaryOutlined } from "@components/Button/styled/ButtonPrimaryOutlined.styled";

export const ClinicListTable = ({
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
    data: clinicsResponseData,
    isLoading: isLoadingClinics,
    refetch,
    isFetching
  } = useGetAllClinicsQuery({
    search: searchValue,
    ordering,
    tabView,
    offset: (Number(pagination?.current) - 1) * Number(pagination?.pageSize),
    limit: pagination.pageSize
  });

  const totalCount = useMemo(() => {
    return clinicsResponseData?.count || 0;
  }, [clinicsResponseData]);

  const clinicsData = clinicsResponseData?.results || [];

  const [data, setData] = useState<IClinicsData[]>([]);

  const switchRole = useSwitchRole();

  const [isLoadingData, setIsLoadingData] = useState(true);

  const handleLoadClinics = async () => {
    setIsLoadingData(true);

    const clinicsTableData: IClinicsData[] = [];

    for (const clinicData of clinicsData) {
      const currentClinicData = {
        key: clinicData.id,
        logo: (
          <FlexGroup
            bg={"dark"}
            style={{
              borderRadius: 12,
              overflow: "hidden"
            }}
          >
            <StyledImage
              style={{
                maxWidth: 210,
                minWidth: 100,
                aspectRatio: "1/1",
                margin: "0 auto"
              }}
              imageStyles={{
                padding: 10,
                objectFit: "contain"
              }}
              src={clinicData.logo || getImageUrl("placeholder.png")}
            />
          </FlexGroup>
        ),
        info: (
          <>
            <Title level={2}>{clinicData.name}</Title>
          </>
        ),
        created: formatDate(new Date()),
        patients:
          clinicData?.patientsByType?.leads +
          clinicData?.patientsByType?.consultations,
        leads: clinicData?.patientsByType.leads,
        consultations: clinicData?.patientsByType?.consultations,
        simulations: clinicData?.simulationsAmount?.total,
        // sessions: 0,
        // lastOpened: formatDate(new Date()),
        actions: (
          <FlexGroup center>
            <ButtonPrimaryOutlined
              onClick={() => {
                switchRole({
                  viewMode: VIEWMODS.CLINIC,
                  clinicId: clinicData.id
                });

                navigate(ROUTES.CLINIC_PATIENTS);
              }}
              style={{ alignSelf: "center", width: "100%" }}
            >
              Clinic view
            </ButtonPrimaryOutlined>
          </FlexGroup>
        )
      };

      clinicsTableData.push(currentClinicData);
    }

    setIsLoadingData(false);
    setData(clinicsTableData);
  };

  useEffect(() => {
    if (isLoadingClinics || isFetching) return;

    handleLoadClinics();
  }, [isLoadingClinics, isFetching]);

  useDebounceEffect(
    () => {
      refetch();
    },
    1000,
    [searchValue, ordering, tabView, pagination.current, pagination.pageSize]
  );

  const tableLoading =
    isLoadingData || isFetching ? { indicator: <SpinnerIcon /> } : false;

  return (
    <>
      <Table
        columns={CLINICS_TABLE_COLUMNS}
        dataSource={data}
        loading={tableLoading}
        locale={tableLoading ? { emptyText: " " } : undefined}
        pagination={{
          ...pagination,
          total: totalCount
        }}
        scroll={{ x: true }}
        tableLayout="fixed"
      />

      <Pagination
        isPaginationLoading={isLoadingData}
        onChange={(currentPage, pageSize) => {
          setPagination({ current: currentPage, pageSize: pageSize });
        }}
        total={totalCount}
      />
    </>
  );
};
