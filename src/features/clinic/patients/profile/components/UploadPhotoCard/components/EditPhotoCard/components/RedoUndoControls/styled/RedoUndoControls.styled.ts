import { position } from "styled-system";
import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonIcon } from "@components/Button/styled/ButtonIcon.styled";

export const StyledRedoUndoControls = styled(FlexGroup)`
  position: absolute;

  ${position}
`;

export const RedoUndoControl = styled(ButtonIcon)`
  color: ${(props) => props.theme.colors.dustyGray};
  background-color: ${(props) => props.theme.background.dustyGray700};
  padding: 4px 8px;
  border: 1px solid ${(props) => props.theme.colors.mineshaft3};
  min-width: auto !important;
  gap: 10px;
  flex: 0 0 24px;
  width: 32px;
  height: 20px;
  border-radius: ${(props) => props.theme.general.borderRadius}px !important;
`;
