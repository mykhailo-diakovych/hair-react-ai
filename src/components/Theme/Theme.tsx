import { ThemeProvider } from "styled-components";
import React from "react";
import { ConfigProvider, theme as AntTheme } from "antd";
import { defaultTheme } from "@config/themes/theme";
import { darkTheme, lightTheme } from "@config/themes/styledTheme";
import { StyledTheme } from "@components/Theme/styled/Theme.styled";

export const ThemeContext = React.createContext<{
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  theme: true,
  setTheme: () => {}
});

export interface ThemeProps extends React.HTMLAttributes<HTMLDivElement> {
  darkMode?: boolean;
  overlay?: boolean;
  children: JSX.Element | JSX.Element[];
}

export const Theme = ({ darkMode = true, children, ...props }: ThemeProps) => {
  const [theme, setTheme] = React.useState(darkMode);

  const styledComponentTheme = {
    ...(theme ? darkTheme : lightTheme),
    ...{ config: { darkMode: theme } }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={styledComponentTheme}>
        <ConfigProvider
          theme={{
            ...defaultTheme,
            algorithm: theme
              ? AntTheme.darkAlgorithm
              : AntTheme.defaultAlgorithm
          }}
        >
          <StyledTheme {...props}>{children}</StyledTheme>
        </ConfigProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
