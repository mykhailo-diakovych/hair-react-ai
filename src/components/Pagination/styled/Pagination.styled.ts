import styled from "styled-components";
import { PaginationBase } from "@components/Pagination/Pagination";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const Pagination = styled(PaginationBase)`
  display: flex;
  justify-content: center;
  align-items: center;

  --pagination-item-size: 30px;

  .ant-pagination-item,
  .ant-pagination-next,
  .ant-pagination-prev {
    width: var(--pagination-item-size) !important;
    height: var(--pagination-item-size) !important;
    min-width: auto !important;
  }

  .ant-pagination-item-link,
  .ant-pagination-jump-next,
  .ant-pagination-jump-prev {
    width: var(--pagination-item-size) !important;
    height: var(--pagination-item-size) !important;
    flex: 0 1 var(--pagination-item-size);
  }

  .ant-pagination-simple-pager {
    margin-inline-end: 0 !important;
    padding-right: 20px;
    display: flex !important;
    align-items: center;

    background-color: transparent;

    input {
      background-color: transparent !important;
      padding: 0 !important;
      margin: 0 !important;
      border-radius: 0 !important;
    }
  }

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.xs}) {
    --pagination-item-size: 24px;
  }
`;

export const PaginationWrapper = styled(FlexGroup).attrs({
  className: "pagination-wrapper"
})`
  --pagination-offset: 24px;

  margin-top: auto;
  width: calc(100% + 2 * var(--pagination-offset));
  margin-bottom: calc(-1 * var(--pagination-offset));
  margin-left: calc(-1 * var(--pagination-offset));
  padding: 13px var(--pagination-offset);

  background-color: ${(props) => props.theme.colors.white} !important;
  border-radius: 0 0 14px 14px;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.lg}) {
    width: auto;
    margin-left: 0;
    margin-bottom: 0;
    flex-direction: column !important;

    & > * {
      justify-content: center !important;
    }

    .ant-pagination {
      order: 3;
    }
  }

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.xs}) {
    padding: 8px;
  }
`;
