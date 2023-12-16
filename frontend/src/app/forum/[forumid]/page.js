"use client";
import React from "react";
import { useParams } from "next/navigation";
import SearchBar from "../../components/mainpage/searchbar";
import Discussplc from "@/app/components/forumn/discussplc";

const Page = () => {
  const { forumid } = useParams();
  const decodedTxt = decodeURIComponent(forumid);
  return (
    <div className="w-screen h-screen m-0 bg-white">
      <SearchBar />
      <div className="flex items-center justify-center mt-20">
        <Discussplc jobname={decodedTxt} />
      </div>
    </div>
  );
};

export default Page;
