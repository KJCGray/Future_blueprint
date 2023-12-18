"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import SearchBar from "../../components/mainpage/searchbar";
import Discussplc from "@/app/components/forumn/discussplc";
import Forumcer from "@/app/components/forumn/forumcer";
import Forumlan from "@/app/components/forumn/forumlan";
import Forumskill from "@/app/components/forumn/forumskill";
import BadgeIcon from "@mui/icons-material/Badge";
import LanguageIcon from "@mui/icons-material/Language";
import { Engineering } from "@mui/icons-material";


function Page() {
  const { forumid } = useParams();
  const decodedTxt = decodeURIComponent(forumid);
  return (
    <div className="w-screen h-screen m-0 bg-white ">
      <SearchBar />
      <p className="p-2 mt-4 ml-4 text-2xl font-semibold text-black rounded-md">
        <div>留言區：{decodedTxt}</div>
      </p>
      <div className="flex items-center w-screen px-4">
        <div className="flex items-center justify-center w-2/5 px-8 py-4 mr-auto rounded bg-slate-200">
          <Discussplc jobname={decodedTxt} />
        </div>
        <div className="w-1/6 mr-4">
          <div className="flex mb-2">
            <BadgeIcon />
            <span className="ml-2 font-semibold">證照推薦</span>
          </div>
          <Forumcer jobname={decodedTxt} className="" />
        </div>
        <div className="w-1/6 mr-4">
          <div className="flex mb-2">
            <LanguageIcon />
            <span className="ml-2 font-semibold">語言推薦</span>
          </div>
          <Forumlan jobname={decodedTxt} className="" />
        </div>
        <div className="w-1/6 mr-4">
          <div className="flex mb-2">
            <Engineering />
            <span className="ml-2 font-semibold">技能推薦</span>
          </div>
          <Forumskill jobname={decodedTxt} className="" />
        </div>
      </div>
    </div>
  );
}

export default Page;
