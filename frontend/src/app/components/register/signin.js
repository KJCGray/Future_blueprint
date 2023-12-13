"use client";
import * as React from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { setCookie, parseCookies } from "nookies";
import axios from "axios";

const Signin = () => {
  const { token } = parseCookies();
  const { userid } = parseCookies();
  useEffect(() => {
    console.log(token, userid);
  }, []);
  const router = useRouter();
  const signinNameRef = useRef("");
  const signinPswdRef = useRef("");
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
  async function loginHandler(e) {
    e.preventDefault();
    router.push("/searchpage");
  }
  async function login(e) {
    e.preventDefault();
  }
  const handleNameChange = (e) => {
    signinNameRef.current = e.target.value;
  };
  const handlePswdChange = (e) => {
    signinPswdRef.current = e.target.value;
  };
  async function signin(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/login`, {
        username: signinNameRef,
        password: signinPswdRef,
      });
      const token = response.data.token;
      const userid = response.data.userId;
      setCookie(null, "token", String(token));
      setCookie(null, "userid", userid);
      console.log(token, userid);
      router.push("/searchpage");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="">
      <form method="post" onSubmit={signin}>
        <div className="flex items-center justify-center mt-4">
          <label
            htmlFor="user"
            className="flex items-center h-10 text-gray-500 bg-white w-60 rounded-2xl"
          >
            <input
              className="pl-4 outline-none"
              placeholder="使用者名稱"
              ref={signinNameRef}
              onChange={handleNameChange}
            />
          </label>
        </div>
        <div className="flex items-center justify-center mt-6">
          <label
            htmlFor="password"
            className="flex items-center h-10 text-gray-500 bg-white w-60 rounded-2xl"
          >
            <input
              className="pl-4 outline-none"
              type="password"
              placeholder="密碼"
              ref={signinPswdRef}
              onChange={handlePswdChange}
            />
          </label>
        </div>
        <div className="flex justify-center mt-4">
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="ochre" type="submmit">
              登入
            </Button>
          </ThemeProvider>
        </div>
      </form>
    </div>
  );
};

export default Signin;
