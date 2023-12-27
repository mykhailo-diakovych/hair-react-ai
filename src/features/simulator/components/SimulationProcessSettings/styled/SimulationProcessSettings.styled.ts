import styled, { css } from "styled-components";

export const SimulationProcessSettingsStyled = styled.div<{
  $isHidden: boolean;
}>`
  max-width: 300px;
  flex: 1 0 300px;
  align-items: start;
  overflow: auto;
  color: ${(props) => props.theme.colors.nobel} !important;
  background-color: ${(props) => props.theme.background.dustyGray700};
  transition: flex-basis 0.2s, width 0.2s;

  @media (min-width: ${({ theme: { breakpoints } }) => breakpoints.lg}) {
    max-height: calc(100vh - 70px);
  }

  @media (min-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    ${(props) =>
      props.$isHidden
        ? css`
            flex-basis: 0;
            width: 0;
          `
        : ""}
  }
`;
