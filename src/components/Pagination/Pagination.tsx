import { useTheme } from "styled-components";
import { useUpdateEffect } from "react-use";
import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { PaginationProps } from "antd/es/pagination/Pagination";
import { Pagination as AntPagination, Skeleton } from "antd";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { PaginationSelect } from "@components/Select/styled/PaginationSelect.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { PaginationWrapper } from "@components/Pagination/styled/Pagination.styled";
import { IconSprite } from "@components/Icon/IconSprite";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export interface IPaginationRef {
  currentPage: number;
  pageSize: number;
}

interface IPaginationProps extends PaginationProps {
  isPaginationLoading?: boolean;
  wrapperStyles?: React.CSSProperties | { [key: string]: string };
}

export const PaginationBase = React.forwardRef<
  IPaginationRef,
  IPaginationProps
>(
  (
    {
      total,
      isPaginationLoading,
      current,
      pageSize: paginationPageSize,
      onChange,
      wrapperStyles,
      ...props
    },
    paginationRef
  ) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTabParam = searchParams.get("page");

    const [currentPage, setCurrentPage] = useState(
      activeTabParam ? parseInt(activeTabParam, 10) : 1
    );
    const [pageSize, setPageSize] = useState(10);
    const totalCount = total || 0;

    const { breakpoints } = useTheme();
    const isMobile = useMediaQuery(`(max-width: ${breakpoints.md})`);

    useEffect(() => {
      const ref =
        paginationRef as React.MutableRefObject<IPaginationRef | null>;

      if (ref && ref?.current) {
        ref.current.currentPage = currentPage;
        ref.current.pageSize = pageSize;
      }

      const params = new URLSearchParams(location.search);
      params.set("page", currentPage.toString());
      setSearchParams(params.toString());

      if (onChange) {
        onChange(currentPage, pageSize);
      }
    }, [currentPage, pageSize]);

    const handleChangePageSize = (prevPageSize: number, pageSize: number) => {
      setPageSize(pageSize);
      setCurrentPage(
        Math.min(
          Math.ceil((prevPageSize * currentPage) / pageSize),
          Math.ceil(totalCount / pageSize)
        )
      );
    };

    useUpdateEffect(() => {
      if (
        current &&
        paginationPageSize &&
        (current !== currentPage || paginationPageSize !== pageSize)
      ) {
        setCurrentPage(current as number);
        setPageSize(paginationPageSize as number);
      }
    }, [current, paginationPageSize]);

    if (isPaginationLoading) {
      return (
        <>
          <PaginationWrapper compact spread style={wrapperStyles}>
            <Skeleton.Button
              active
              style={{
                width: 150,
                maxWidth: "100%",
                display: "block",
                margin: "0 auto"
              }}
            />

            <Skeleton.Button
              active
              block
              style={{ maxWidth: 400, display: "block", margin: "0 auto" }}
            />

            <Skeleton.Button
              active
              style={{
                width: 150,
                maxWidth: "100%",
                display: "block",
                margin: "0 auto"
              }}
            />
          </PaginationWrapper>
        </>
      );
    }

    return (
      <PaginationWrapper spread style={wrapperStyles}>
        <FlexGroup centerY>
          <PaginationSelect
            onChange={(value) =>
              handleChangePageSize(pageSize, value as number)
            }
            defaultValue={10}
            style={{ width: 70 }}
            options={[
              { value: 10, label: 10 },
              { value: 20, label: 20 },
              { value: 50, label: 50 },
              { value: 100, label: 100 }
            ]}
          />
          <Paragraph>Users per page</Paragraph>
        </FlexGroup>

        <AntPagination
          pageSize={pageSize}
          current={currentPage}
          simple={isMobile}
          prevIcon={
            <button className="ant-pagination-item-link">
              <IconSprite
                iconName="pagination/arrow-left"
                style={{ width: 12, height: 12 }}
              />
            </button>
          }
          nextIcon={
            <button className="ant-pagination-item-link">
              <IconSprite
                iconName="pagination/arrow-right"
                style={{ width: 12, height: 12 }}
              />
            </button>
          }
          total={total}
          onChange={(page) => {
            setCurrentPage(page);
          }}
          showSizeChanger={false}
          {...props}
        />

        <FlexGroup centerY style={{ justifyContent: "flex-end" }}>
          <Paragraph>Select page:</Paragraph>
          <PaginationSelect
            value={currentPage}
            style={{ width: 60 }}
            onSelect={(value) => {
              setCurrentPage(value as number);
            }}
            options={new Array(Math.ceil(totalCount / pageSize))
              .fill(null)
              .map((_, index) => {
                return {
                  value: index + 1,
                  label: index + 1
                };
              })}
          />
        </FlexGroup>
      </PaginationWrapper>
    );
  }
);
