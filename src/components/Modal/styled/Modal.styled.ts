import { layout } from "styled-system";
import styled from "styled-components";
import { ModalBase } from "@components/Modal/Modal";

export const Modal = styled(ModalBase)`
  transform-origin: initial !important;
  z-index: 9999 !important;
  max-width: 800px;
  width: 100% !important;
  padding: 20px 0 !important;

  .ant-modal-header {
    border-radius: 8px 8px 0 0;
    padding: 16px 20px;
    text-align: center;
    margin-bottom: 0;
    background-color: ${(props) => props.theme.background.modalHeader};
  }

  .ant-modal-content {
    padding: 0;
  }

  .ant-modal-body {
    max-height: calc(100vh - 140px);
    overflow: auto;
    padding: 40px;
    background-color: ${(props) => props.theme.background.modalBody};
  }

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
    .ant-modal-body {
      padding: 20px;
    }
  }

  ${layout}
`;
