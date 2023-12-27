import { css } from "styled-components";

export const GlobalMenuStyles = css`
  .menu-item-enter {
    opacity: 0;
    transform: translateX(-100%);
  }

  .menu-item-enter-active {
    opacity: 1;
    transform: translateX(0%);
    transition: opacity 1000ms ease-in, transform 1000ms ease-in;
  }

  .menu-item-exit {
    opacity: 1;
    transform: translateX(0%);
  }

  .menu-item-exit-active {
    opacity: 0;
    transform: translateX(-100%);
    transition: opacity 500ms ease-in, transform 500ms ease-in;
  }
`;
