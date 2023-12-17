"use client";
import React from "react";
import { useParams } from "next/navigation";
import SearchBar from "../../components/mainpage/searchbar";
import Discussplc from "@/app/components/forumn/discussplc";

const Page = () => {
  const { forumid } = useParams();
  const decodedTxt = decodeURIComponent(forumid);
  return (
    <div className="w-screen h-screen m-0 bg-white ">
      <SearchBar />
        <p className="p-2 mt-4 ml-4 text-2xl font-semibold text-black rounded-md">
          <div>留言區：{decodedTxt}</div>
        </p>
      <div className="flex flex-col items-center mx-8">
        <div className="flex items-center justify-center w-2/5 px-8 py-4 mr-auto rounded bg-slate-200">
          <Discussplc jobname={decodedTxt} />
        </div>
      </div>
    </div>
  );
};

export default Page;
