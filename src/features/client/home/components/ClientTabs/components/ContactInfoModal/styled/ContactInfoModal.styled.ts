import styled from "styled-components";
import { Modal } from "@components/Modal/styled/Modal.styled";

export const ContactInfoModal = styled(Modal)`
  max-width: 395px;
  padding: 30px;

  .ant-modal-header {
    display: none;
  }

  .ant-modal-body {
    border-radius: ${(props) => props.theme.general.borderRadius}px !important;
    overflow: hidden;
    padding: 0;
  }

  .ant-modal-close {
    top: 16px;
    right: 16px;
    color: ${(props) => props.theme.colors.black} !important;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    position: absolute;
    max-width: 100%;
    width: 100%;
    margin: 0;
    border-radius: 0;
    bottom: 0;
    left: 0;
    right: 0;
    top: unset !important;
    padding: 0 !important;
  }
`;
