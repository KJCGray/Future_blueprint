"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";

const signup = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
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
  async function signHandler(e) {
    e.preventDefault();
    router.push("/searchpage");
  }
  return (
    <div className="">
      <form method="post" onSubmit={signHandler}>
        <div className="flex items-center justify-center mt-4">
          <label htmlFor="user" className="flex items-center h-10 bg-white w-60 rounded-2xl">
            <input className="pl-4 outline-none" placeholder="使用者名稱" />
          </label>
        </div>
        <div className="flex items-center justify-center mt-6">
          <label htmlFor="email" className="flex items-center h-10 bg-white w-60 rounded-2xl">
            <input className="pl-4 outline-none " placeholder="電子信箱" />
          </label>
        </div>
        <div className="flex items-center justify-center mt-6">
          <label htmlFor="password" className="flex items-center h-10 bg-white w-60 rounded-2xl">
            <input className="pl-4 outline-none" type="password" placeholder="密碼" />
          </label>
        </div>
        <div className="flex justify-center mt-4">
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="ochre" type="submmit">
              註冊帳號
            </Button>
          </ThemeProvider>
        </div>
      </form>
    </div>
  );
};

export default signup;
