import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";
import { GlobalSwiperStyles } from "@styles/componentsGlobals/swiper.styled";
import { GlobalMenuStyles } from "@styles/componentsGlobals/menu.styled";
import { GlobalEyeIconStyles } from "@styles/componentsGlobals/eyeIcon.styled";
import { GlobalCrispChatStyles } from "@styles/componentsGlobals/crispChat.styled";
import { GlobalAntDesignStyles } from "@styles/componentsGlobals/antDesign.styled";

export const GlobalStyles = createGlobalStyle`
  ${normalize()}

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    font-family: inherit;
  }

  html {
    height: 100%;
    box-sizing: border-box;
    font-family: ${(props) => props.theme.typography.fontFamily};
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    min-width: 280px;
    min-height: 100%;
    font-family: ${(props) => props.theme.typography.fontFamily};
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    font-size: ${(props) => props.theme.typography.fontSize}px;
    line-height: ${(props) => props.theme.typography.lineHeight};
    background-color: ${(props) => props.theme.background.secondary};
    color: ${(props) => props.theme.colors.primary};
  }

  input,
  button,
  textarea {
    font-family: ${(props) => props.theme.typography.fontFamily};
    font-size: inherit;
    border: none;
  }

  input {
    vertical-align: middle;
    line-height: inherit;
    font: inherit;
    color: inherit;
  }

  input::placeholder {
    color: inherit;
    background-color: inherit;
  }

  img {
    vertical-align: middle;
    height: auto;
    min-width: 0;
    max-width: 100%;
    object-fit: cover;
  }

  a {
    line-height: inherit;
    text-decoration: none;
    color: inherit;
    
    &:hover {
      color: inherit;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: inherit;
    font-size: inherit;
  }

  button {
    cursor: pointer;
  }

  #root {
    display: grid;
    flex-direction: column;
    min-height: 100vh;
    min-height: 100dvh;
  }
  
  .text-area {
    position: relative;

    &__icon {
      position: absolute;
      top: 14px;
      left: 24px;
      z-index: 3;
    }
  }

  .prism-code {
    tab-size: 4;
    white-space: pre-wrap;
    -moz-tab-size: 4; /* For Firefox */
  }
  
  .ReactQueryDevtools {
    position: absolute;
  }

  .custom-cursor {
    position: fixed;
    transition: opacity 0.3s ease-in-out;
    pointerEvents: none;
    zIndex: 9999;
  }
  
  .widget-popover {
    z-index: 100;
  }

  .visually-hidden {
    position: absolute;
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    overflow: hidden;
    margin: -1px;
    border: 0;
    padding: 0;
    width: 1px;
    height: 1px;
  }

  html, body {touch-action: pan-x pan-y !important;}
  
  ${GlobalAntDesignStyles}
  ${GlobalMenuStyles}
  ${GlobalEyeIconStyles}
  ${GlobalSwiperStyles}
  ${GlobalCrispChatStyles}
`;
