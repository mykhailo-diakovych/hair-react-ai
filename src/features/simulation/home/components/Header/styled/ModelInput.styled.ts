import styled from "styled-components";
import { Input } from "@components/Input/styled/Input.styled";

export const ModelInput = styled(Input)`
  flex: 1 1 auto;
  color: ${(props) => props.theme.colors.dustyGray};
  max-width: 175px;
`;
