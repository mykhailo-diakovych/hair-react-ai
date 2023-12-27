import styled, { css } from "styled-components";
import { rgba } from "polished";

export const StyledEffect = styled.button<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: ${(props) => rgba(props.theme.background.primary, 0.75)};
  overflow: hidden;
  border-radius: ${(props) => props.theme.general.borderRadius / 2}px;

  padding: 5px 0;
  color: inherit;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;

  ${(props) =>
    props.active &&
    css`
      border-color: ${props.theme.colors.primary};
      background-color: ${(props) => props.theme.background.primary};
    `}

  svg {
    flex: 1 1 100%;
  }
`;
