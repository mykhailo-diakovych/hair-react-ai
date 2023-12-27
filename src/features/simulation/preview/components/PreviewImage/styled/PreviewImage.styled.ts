import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const StyledPreviewImage = styled(FlexGroup)`
  width: 100%;

  .ant-skeleton {
    width: 100%;
    height: 100%;
  }

  .ant-skeleton .ant-skeleton-image {
    height: 100%;
    width: 100%;
  }
`;
