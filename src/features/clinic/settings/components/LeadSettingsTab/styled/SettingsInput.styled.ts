import styled from "styled-components";
import { Input } from "@components/Input/styled/Input.styled";

export const SettingsInput = styled(Input)`
  height: 50px;
  border: none;
  background-color: ${(props) => props.theme.colors.mystic};

  &:disabled {
    pointer-events: all;
    cursor: auto;
    color: ${(props) => props.theme.colors.black};
    background-color: ${(props) => props.theme.colors.mystic};
  }
`;
