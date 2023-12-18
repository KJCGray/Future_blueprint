"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { setCookie } from "nookies";
import axios from "axios";
import Swal from "sweetalert2";

function Signup() {
  const signupNameRef = useRef("");
  const signupEmailRef = useRef("");
  const signupPswdRef = useRef(""); 
  const handleNameChange = (e) => {
    signupNameRef.current = e.target.value;
  };
  const handleEmailChange = (e) => {
    signupEmailRef.current = e.target.value;
  };
  const handlePswdChange = (e) => {
    signupPswdRef.current = e.target.value;
  };
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
  async function signup(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/register`, {
        username: signupNameRef,
        email: signupEmailRef,
        password: signupPswdRef,
      });
      const token = response.data.token;
      const userid = response.data.userId;
      const email = response.data.email;
      setCookie(null, "email", email);
      setCookie(null, "token", String(token));
      setCookie(null, "userid", userid);
      console.log(token, userid);
      Swal.fire("註冊成功", "歡迎使用Future Blueprint", "success").then(() => {
        router.push("/searchpage");
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "confirm",
      });
    }
  }
  return (
    <div className="">
      <form method="post" onSubmit={signup}>
        <div className="flex items-center justify-center mt-4">
          <label htmlFor="user" className="flex items-center h-10 bg-white w-60 rounded-2xl">
            <input
              className="pl-4 outline-none"
              placeholder="使用者名稱"
              ref={signupNameRef}
              onChange={handleNameChange}
            />
          </label>
        </div>
        <div className="flex items-center justify-center mt-6">
          <label htmlFor="email" className="flex items-center h-10 bg-white w-60 rounded-2xl">
            <input
              className="pl-4 outline-none "
              placeholder="電子信箱"
              ref={signupEmailRef}
              onChange={handleEmailChange}
            />
          </label>
        </div>
        <div className="flex items-center justify-center mt-6">
          <label htmlFor="password" className="flex items-center h-10 bg-white w-60 rounded-2xl">
            <input
              className="pl-4 outline-none"
              type="password"
              placeholder="密碼"
              ref={signupPswdRef}
              onChange={handlePswdChange}
            />
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
}

export default Signup;
