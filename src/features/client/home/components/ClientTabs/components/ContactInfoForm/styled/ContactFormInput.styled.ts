import styled from "styled-components";
import { FieldInput } from "@components/Input/variants/FieldInput";

export const ContactFormInput = styled(FieldInput)`
  height: 50px;
  background-color: ${(props) => props.theme.colors.mineshaft8};

  &::placeholder {
    color: ${(props) => props.theme.colors.primary};
    font-weight: 700;
    font-size: 16px;
  }
`;
