import { css } from "styled-components";

export const GlobalCrispChatStyles = css`
  body {
    .crisp-client .cc-tlyw .cc-kxkl .cc-nsge .cc-imbb {
      display: none !important;
    }

    .crisp-client .cc-tlyw .cc-kxkl .cc-1hqb {
      right: calc(50% + 32px) !important;
      bottom: 32px;
    }

    .crisp-client .cc-tlyw .cc-kxkl .cc-1hqb .cc-gye0 {
      height: 400px !important;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    body {
      .crisp-client .cc-tlyw .cc-kxkl .cc-1hqb {
        right: 32px !important;
        bottom: 32px;
      }
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    body {
      .crisp-client .cc-tlyw .cc-kxkl .cc-1hqb {
        right: 10px !important;
        bottom: 10px;
      }
    }
  }
`;
