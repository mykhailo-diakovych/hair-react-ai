import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const StyledTabsExtraContent = styled(FlexGroup)`
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.xs}) {
    flex-wrap: wrap;
    align-items: stretch;

    .ant-input-affix-wrapper {
      max-width: 100% !important;
    }
  }
`;
