import styled from "styled-components";
import { ButtonIcon } from "@components/Button/styled/ButtonIcon.styled";

export const ClinicSettingsUserButton = styled(ButtonIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  padding: 0;
  color: ${(props) => props.theme.colors.dovegray};
`;
