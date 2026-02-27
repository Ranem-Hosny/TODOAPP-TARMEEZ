import { createTheme } from "@mui/material/styles";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

const Themecontext = createContext();

export const useTheme = () => useContext(Themecontext);

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    const saveMode = localStorage.getItem("theme");
    return saveMode ? JSON.parse(saveMode) : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(mode));
  }, [mode]);
  
  const handleToggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));

    localStorage.setItem("theme", JSON.stringify(mode));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: {
                  default: "#FAF7F5",
                  paper: "#FFFFFF",
                },
                card: {
                  small: "#F0EDEB",
                },
                primary: {
                  main: "#6C63FF",
                },
                text: {
                  primary: "#1A1A1A",
                },
              }
            : {
                background: {
                  default: "#1C1C1E",
                  paper: "#2A2A2E",
                },
                card: {
                  small: "#3A3A3F",
                },
                primary: {
                  main: "#8E7FFF",
                },
                text: {
                  primary: "#EAEAEA",
                },
              }),
        },
      }),
    [mode],
  );

  return (
    <Themecontext.Provider value={{ mode, theme, setMode, handleToggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </Themecontext.Provider>
  );
}
