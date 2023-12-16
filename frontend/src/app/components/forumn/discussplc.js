import React from "react";
import { useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import { Button } from "@mui/material";
function Discussplc({ jobname }) {
  const [content, setContent] = useState(null);
  const { userid, username, token } = parseCookies();
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
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Button onClick={fetchMsgUpdate}>更新留言</Button>
    </div>
  );
}

export default Discussplc;
