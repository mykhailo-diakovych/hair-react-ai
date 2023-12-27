import { color, space, typography } from "styled-system";
import styled from "styled-components";
import { ButtonBase } from "@components/Button/Button";

export const ButtonText = styled(ButtonBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  background-color: transparent !important;
  box-shadow: none;
  padding: 5px;
  margin: -5px;

  color: ${(props) => props.color || "inherit"};

  &:hover {
    color: ${(props) =>
      props.$hoverColor ? props.$hoverColor : "inherit"} !important;
  }

  // styled-system additional props
  ${space}
  ${color}
  ${typography}
`;
