import styled, { css } from "styled-components";

export const StyledGalleryImageContainer = styled.div<{ $disabled: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 26px;
  padding: 16px;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - 72px);

  ${(props) =>
    props.$disabled &&
    css`
      cursor: not-allowed;

      button {
        pointer-events: none;
      }
    `};

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    flex-direction: row;
  }
`;
