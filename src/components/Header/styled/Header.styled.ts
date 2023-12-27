import { position } from "styled-system";
import styled, { css } from "styled-components";
import React from "react";

export const StyledHeader = styled(({ component, ...props }) =>
  React.cloneElement(component, props)
)`
  position: relative;
  display: flex;
  align-items: flex-end;
  column-gap: 20px;
  margin-bottom: 30px;

  // disable scrolling main content when menu is open
  ${(props) =>
    props.$menuOpen &&
    css`
      body {
        overflow: hidden;
      }
    `}

  ${position}
`;
