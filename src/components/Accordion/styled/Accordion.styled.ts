import styled from "styled-components";
import { AccordionBase } from "@components/Accordion/Accordion";

export const Accordion = styled(AccordionBase)`
  .ant-collapse-header {
    padding: 6px 12px !important;
    background-color: ${({ theme }) => theme.colors.mineshaft};
    font-weight: bold;
  }

  .ant-collapse-content {
    color: inherit;
  }

  .ant-collapse-content-box {
    padding: 10px !important;
  }

  .ant-collapse-item {
    margin-bottom: 0 !important;
    border-top: 1px solid ${(props) => props.theme.colors.scorpion} !important;
    border-bottom: none !important;

    &:last-child {
      border-bottom: 1px solid ${(props) => props.theme.colors.scorpion} !important;
    }

    .ant-collapse-expand-icon svg {
      transition: transform 0.4s;
    }

    &-active .ant-collapse-expand-icon svg {
      transform: rotate(-180deg) !important;
    }
  }
`;
