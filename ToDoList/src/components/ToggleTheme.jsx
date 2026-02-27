import Button from "@mui/material/Button";
import React from "react";
import { useTheme } from "../context/ThemeProvider";
import LightModeIcon from "@mui/icons-material/LightMode";

import DarkModeIcon from "@mui/icons-material/DarkMode";
export default function ToggleTheme() {
  const { handleToggleTheme, mode } = useTheme();
  return (
    <div
      className=""
      style={{
        justifyContent: "end",
        display: "flex",
        width: "100%",
        position: "absolute",
        top: "10px",
      }}
    >
      <Button onClick={handleToggleTheme}>
        {mode === "light" ? (
          <DarkModeIcon fontSize="large" />
        ) : (
          <LightModeIcon />
        )}
      </Button>
    </div>
  );
}
