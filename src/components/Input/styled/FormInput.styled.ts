import styled from "styled-components";
import { FieldInput } from "@components/Input/variants/FieldInput";

export const FormInput = styled(FieldInput)`
  height: 50px;
  border: none;
  background-color: ${(props) => props.theme.colors.mystic};
`;
