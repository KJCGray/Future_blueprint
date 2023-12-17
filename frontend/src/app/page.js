"use client";
import * as React from "react";
import Total from "./components/register/total";
import SearchBar from "./components/mainpage/searchbar";

export default function Login() {
  return (
    <div className="h-screen bg-gradient-to-r from-[#f5ddb7] to-white ">
      <SearchBar />
      <div className="flex flex-col items-center w-auto h-auto mt-12 ">
        <Total />
      </div>
    </div>
  );
}
