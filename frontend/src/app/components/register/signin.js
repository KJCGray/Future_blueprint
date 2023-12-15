"use client";
import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { setCookie, parseCookies } from "nookies";
import Image from "next/image";
import axios from "axios";

const Signin = () => {
  const { token } = parseCookies();
  const { userid } = parseCookies();
  const [loading, setLoading] = useState(false);
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
  const handleNameChange = (e) => {
    signinNameRef.current = e.target.value;
  };
  const handlePswdChange = (e) => {
    signinPswdRef.current = e.target.value;
  };
  async function signin(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/login`, {
        username: signinNameRef,
        password: signinPswdRef,
      });
      const token = response.data.token;
      const userid = response.data.userId;
      console.log(response);
      setCookie(null, "token", String(token));
      setCookie(null, "userid", userid);
      console.log(token, userid);
      router.push("/searchpage");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="h-auto">
      {loading ? (
        <div className="flex items-center justify-center h-auto">
          <Image src="/giphy.gif" alt="logingif" height={150} width={150}></Image>
        </div>
      ) : (
        <>
          <form method="post" onSubmit={signin}>
            <div className="flex items-center justify-center mt-8">
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
                  會員登入
                </Button>
              </ThemeProvider>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Signin;
