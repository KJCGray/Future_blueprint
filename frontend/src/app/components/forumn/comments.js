import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
function Comments({ com }) {
  const avatarLetter = com.username && com.username.charAt(0).toUpperCase();
  console.log("username:", com.username);
  return (
    <div className="mb-4">
      <div className="flex items-center w-auto h-auto">
        <Avatar sx={{ bgcolor: deepOrange[500] }} className="mr-4">
          {avatarLetter}
        </Avatar>
        <div className="">
          <p className="p-1 break-all bg-white rounded">{com.content}</p>
        </div>
      </div>
      <div className="mt-2 ml-2 text-xs">{com.time}</div>
    </div>
  );
}

export default Comments;
