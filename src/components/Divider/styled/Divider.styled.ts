import styled from "styled-components";
import { DividerBase } from "@components/Divider/Divider";

export const Divider = styled(DividerBase)`
  border-block-start-color: ${(props) => props.$color};

  ${(props) =>
    props.$color && `border-block-start-color: ${props.$color} !important;`}
  ${(props) =>
    props.$width &&
    `border-block-start: ${props.$width || 2}px solid ${
      props.$color || props.theme.colors.mineshaft700
    } !important;`}

  @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
    margin: 10px 0;
  }
`;
