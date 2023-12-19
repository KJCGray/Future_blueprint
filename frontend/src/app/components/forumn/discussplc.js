"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import { Button } from "@mui/material";
import Comments from "../forumn/comments";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Link from "next/link";
function Discussplc({ jobname }) {
  const [content, setContent] = useState("");
  const [commentplc, setCommentplc] = useState([]);
  const { userid, username, token } = parseCookies();
  const avatarLetter = username ? username.charAt(0).toUpperCase() : "x"; // 提取第一個字母，轉為大寫

  useEffect(() => {
    fetchMsgDisplay();
  }, []);
  const handleCommentChange = (e) => {
    setContent(e.target.value); // 更新 state
  };
  async function fetchMsgDisplay() {
    console.log("顯示");
    try {
      const response = await axios.post(`http://localhost:5000/api/Selectmsg`, {
        job_L_class: jobname,
      });
      console.log(response.data);
      setCommentplc(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchMsgUpdate() {
    console.log("留言");
    try {
      const response = await axios.post(`http://localhost:5000/api/msg`, {
        job_L_class: jobname,
        content: content,
        userId: userid,
        username: username,
        token: token,
      });
      console.log(response);
      setContent("");
    } catch (error) {
      console.log(error);
    }
  }
  async function updDis(e) {
    e.preventDefault(); // 防止預設表單提交行為
    await fetchMsgUpdate();
    await fetchMsgDisplay();
    window.scrollTo({ bottom: 0, behavior: "smooth" });
  }
  return (
    <div className="my-2 mr-auto">
      <div className="w-auto p-4 overflow-auto h-[300px] no-scrollbar">
        {commentplc.map((comment) => (
          <Comments key={comment} com={comment} />
        ))}
      </div>
      {userid ? (
        <form method="post" onSubmit={updDis} className="flex p-4 ">
          <label htmlFor="user" className="flex">
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{avatarLetter}</Avatar>
            <input
              className="p-2 mx-2 border border-solid 1/12 border-slate-500 rounded-2xl focus:outline-none"
              placeholder="輸入留言..."
              value={content} // 使用 controlled component，將值綁定到 state
              onChange={handleCommentChange}
            />
          </label>
          <Button variant="outlined" type="submit">
            送出訊息
          </Button>
        </form>
      ) : (
        <div className="flex justify-center w-auto">
          <Link
            className="border-b border-black hover:text-gray-600 hover:border-gray-500"
            href={"/"}
          >
            前往登入以留言
          </Link>
        </div>
      )}
    </div>
  );
}

export default Discussplc;
