"use client";
import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const searchbar = () => {
  const theme = createTheme({
    palette: {
      ochre: {
        main: "#ffd7be",
        light: "#E9DB5D",
        dark: "#f5ddb7",
        contrastText: "#a38d80",
      },
    },
  });
  return (
    <div className="flex items-center w-screen border-b-2 h-14 border-[#f8dece] bg-white"></div>
  );
};

export default searchbar;
