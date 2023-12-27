import { space } from "styled-system";
import styled from "styled-components";
import { ButtonBase } from "@components/Button/Button";

export const ButtonCircle = styled(ButtonBase)`
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.25);
  padding: 0;

  // styled-system additional props
  ${space}
`;
