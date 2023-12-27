import styled, { css } from "styled-components";

export const StyledNavigationItem = styled.li<{
  $active: boolean;
}>`
  margin: 0 -24px;
  transition: background-color 0.1s ease-in-out;
  font-weight: 500;
  border-bottom: 1px solid ${(props) => props.theme.colors.black};

  svg {
    transition: color 0.2s ease-in-out;
  }

  ${(props) =>
    props.$active
      ? css`
          position: relative;
          color: ${props.theme.colors.white};

          svg {
            color: ${props.theme.colors.malibuLight} !important;
          }

          &::before {
            content: "";
            width: 2px;
            height: 24px;
            background-color: ${props.theme.colors.malibuLight};
            position: absolute;
            left: 0;
            pointer-events: none;
            top: 50%;
            border-radius: 0 2px 2px 0;
            transform: translateY(-50%);
          }
        `
      : css`
          color: ${props.theme.colors.nobel};
        `}

  &:hover {
    color: ${(props) => props.theme.colors.white};

    svg {
      color: ${(props) => props.theme.colors.malibuLight} !important;
    }
  }
`;
