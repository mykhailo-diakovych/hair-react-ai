import styled from "styled-components";
import { cover, rgba } from "polished";

export const StyledLoader = styled.div`
  ${cover()}
  position: fixed;
  z-index: 2323;
  max-height: 100vh;
  max-height: 100dvh;
  overflow: hidden;
  background-color: ${(props) => rgba(props.theme.background.secondary, 0.4)};

  .loader {
    width: 100%;
    height: 100%;
  }

  &::before {
    content: "";
    ${cover()}
    background-color: ${(props) => rgba(props.theme.background.secondary, 0.4)};
  }
`;
