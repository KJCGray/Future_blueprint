import React from "react";
import { useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import { Button } from "@mui/material";
function Discussplc({ jobname }) {
  const [content, setContent] = useState(null);
  const { userid, username, token } = parseCookies();
  const handleCommentChange = (e) => {
    setContent(e.target.value); // 更新 state
  };
  async function fetchMsgDisplay() {
    console.log(jobname);
    try {
      const response = await axios.post(`http://localhost:5000/api/Selectmsg`, {
        job_L_class: jobname,
      });
      console.log(response.data[0]);
      console.log("顯示");
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchMsgUpdate() {
    setContent("測試");
    console.log(jobname);
    try {
      const response = await axios.post(`http://localhost:5000/api/msg`, {
        job_L_class: jobname,
        content: content,
        userId: userid,
        username: username,
        token: token,
      });
      console.log(response);
      console.log("留言");
      setContent("");
    } catch (error) {
      console.log(error);
    }
  }
  function updDis() {
    fetchMsgUpdate();
    fetchMsgDisplay();
  }
  return (
    <div>
      <Button onClick={fetchMsgUpdate}>更新留言</Button>
      <form method="post" onSubmit={updDis}>
        <label htmlFor="user" className="">
          <input
            className="p-2 border border-solid 1/12 border-slate-200 rounded-2xl"
            placeholder="輸入留言..."
            value={content} // 使用 controlled component，將值綁定到 state
            onChange={handleCommentChange}
          />
        </label>
        <Button variant="outlined" type="submit">
          送出訊息
        </Button>
      </form>
    </div>
  );
}

export default Discussplc;
