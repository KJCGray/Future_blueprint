"use client";
import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { setCookie } from "nookies";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Signin = () => {
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
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:5000/api/login`, {
        username: signinNameRef,
        password: signinPswdRef,
      });
      const token = response.data.token;
      const userid = response.data.userId;
      const username = response.data.username;
      console.log(response);
      setCookie(null, "token", String(token));
      setCookie(null, "userid", userid);
      setCookie(null, "username", username);
      console.log(token, userid);
      router.push("/searchpage");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "confirm",
      });
    } finally {
      // 无论异步操作成功或失败都执行，确保 setLoading(false)
      setLoading(false);
    }
  }
  return (
    <div className="h-auto">
      {loading ? (
        <div className="h-60">
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      ) : (
        <>
          <form method="post" onSubmit={signin}>
            <div className="flex items-center justify-center mt-10 ">
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
            <div className="flex items-center justify-center mt-10">
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
            <div className="flex justify-center mt-10">
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
