import styled from "styled-components";
import { ThemeProps } from "@components/Theme/Theme";

export const StyledTheme = styled.div<ThemeProps>`
  ${(props) =>
    props.overlay &&
    `
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    height: 100%;
  
    color: ${props.theme.colors.primary};
    background-color: ${
      props.theme.config.darkMode
        ? props.theme.background.secondary
        : props.theme.background.secondary
    };
  `}
`;
