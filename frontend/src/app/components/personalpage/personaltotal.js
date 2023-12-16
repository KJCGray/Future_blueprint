"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Userdata from "./userdata";
import Accountsetting from "./accountsetting";
import Commenthistory from "./commenthistory";
import Mycollection from "./mycollection";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";

const Personaltotal = () => {
  const [currentPage, setCurrentPage] = useState("userdata");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const { token, userid } = parseCookies();
    if (!token || !userid) {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    destroyCookie(null, "token");
    destroyCookie(null, "userid");
    destroyCookie(null, "username");
    console.log("destroy");
    router.push("/");
  };
  function changePage(page) {
    setCurrentPage(page);
  }

  if (!isLoggedIn) {
    return (
      <div className="space-x-20 flex items-center justify-center rounded-xl w-[260px] h-[400px]">
        <div className="flex flex-col w-[600px] h-[400px] p-8 m-4 space-y-8 bg-orange-100 rounded-xl">
          <Button disabled 
            className={`w-32 p-2 font-semibold text-yellow-900 bg-orange-200 ${
              currentPage === "userdata" ? "border-b-2" : ""
            }`}
            onClick={() => changePage("userdata")}
          >
            個人資料
          </Button>
          <Button disabled 
            className={`w-32 p-2 font-semibold text-yellow-900 bg-orange-200  ${
              currentPage === "accountsetting" ? "border-b-2" : ""
            }`}
            onClick={() => changePage("accountsetting")}
          >
            帳戶設定
          </Button>
          <Button disabled 
            className={`w-32 p-2 font-semibold text-yellow-900 bg-orange-200  ${
              currentPage === "commenthistory" ? "border-b-2" : ""
            }`}
            onClick={() => changePage("commenthistory")}
          >
            留言紀錄
          </Button>
          <Button disabled 
            className={`w-32 p-2 font-semibold text-yellow-900 bg-orange-200  ${
              currentPage === "mycollect" ? "border-b-2" : ""
            }`}
            onClick={() => changePage("mycollect")}
          >
            我的收藏
          </Button>
          <Button disabled className="font-semibold text-yellow-900 bg-orange-200" onClick={handleLogout}>
            登出
          </Button>
        </div>
        <div>
          {currentPage === "userdata" && <Userdata />}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-x-20 flex items-center justify-center rounded-xl w-[260px] h-[400px]">
      <div className="flex flex-col w-4/5 p-8 m-4 space-y-8 bg-orange-100 h-4/5 rounded-xl">
        <Button
          className={`w-28 flex p-2 font-semibold text-yellow-900 bg-orange-200 ${
            currentPage === "userdata" ? "border-b-2" : ""
          }`}
          onClick={() => changePage("userdata")}>
          個人資料
        </Button>
        <Button
          className={`p-2 font-semibold text-yellow-900 bg-orange-200  ${
            currentPage === "accountsetting" ? "border-b-2" : ""
          }`}
          onClick={() => changePage("accountsetting")}>
          帳戶設定
        </Button>
        <Button
          className={`p-2 font-semibold text-yellow-900 bg-orange-200  ${
            currentPage === "commenthistory" ? "border-b-2" : ""
          }`}
          onClick={() => changePage("commenthistory")}>
          留言紀錄
        </Button>

        <Button className="font-semibold text-yellow-900 bg-orange-200" onClick={handleLogout}>
          登出
        </Button>
      </div>
      <div>
        {currentPage === "userdata" && <Userdata />}
        {currentPage === "accountsetting" && <Accountsetting />}
        {currentPage === "commenthistory" && <Commenthistory />}
        {currentPage === "mycollect" && <Mycollection />}
      </div>
    </div>
  );
};
export default Personaltotal;
