import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const StyledUploadPhotoError = styled(FlexGroup)`
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  border-radius: 12px;
  padding: 10px 10px 10px 20px;
  border: 1px solid ${(props) => props.theme.colors.red};
  background-color: ${(props) => props.theme.colors.mineshaft};
`;
