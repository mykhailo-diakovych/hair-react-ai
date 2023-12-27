import styled from "styled-components";
import { HeaderBase } from "@features/simulation/home/components/Header/Header";

export const Header = styled(HeaderBase)`
  position: relative;
  padding: 15px;
  color: ${(props) => props.theme.colors.dustyGray};
  background-color: ${(props) => props.theme.colors.mineshaft};

  /* &.header__inner:last-of-type {
    margin-left: auto;
  } */

  &.header__inner nav,
  &.header__inner a {
    flex: 0 1 200px;
  }

  &.header__inner a {
    z-index: 10;
    justify-content: flex-end;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-wrap: wrap;

    &.client-header .header-title {
      display: none;
    }

    .header-buttons__group {
      flex-wrap: wrap;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    &.header__inner a {
      flex: 1 1 auto;
    }
  }
`;
