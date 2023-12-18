"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import axios from "axios";
import Swal from "sweetalert2";

function Signup() {
  // useEffect(() => {
  //   destroyCookie({}, "token");
  //   destroyCookie({}, "userid");
  //   destroyCookie({}, "username");
  //   destroyCookie({}, "email");
  // }, []);
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
    const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const password = signupPswdRef.current;
    if (password && !passwordRule.test(password)) {
      Swal.fire("密碼格式不符", "須含1個大寫和1個小寫字母及數字，且長度必須超過8", "error");
      return;
    }
    const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = signupEmailRef.current;
    if (email && !emailRule.test(email)) {
      Swal.fire("電子郵件格式不符", "請輸入有效的電子郵件地址", "error");
      return;
    }
    try {
      const response = await axios.post(`http://localhost:5000/api/register`, {
        username: signupNameRef,
        email: signupEmailRef,
        password: signupPswdRef,
      });
      const token = response.data.token;
      const userid = response.data.userId;
      const email = response.data.email;
      console.log(response);
      setCookie(null, "email", email);
      setCookie(null, "token", String(token));
      setCookie(null, "userid", userid);
      setCookie(null, "username", response.data.username);
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
