import styled from "styled-components";
import { ButtonPrimary } from "@components/Button/styled/ButtonPrimary.styled";

export const ContactFormButton = styled(ButtonPrimary)`
  background: linear-gradient(90deg, #6741ff 0%, #b587ff 100%) !important;
  height: 50px;
  align-items: center;
  font-weight: 700;

  &:not(:disabled):hover {
    box-shadow: 2px 2px 1px #b587ff;
    background: linear-gradient(90deg, #6741ff 0%, #b587ff 100%) !important;
  }
`;
