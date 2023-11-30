import * as React from "react";
import Button from "@mui/material/Button";
import Navbar from "../components/navbar";
import Jobsearch from "../components/mainpage/jobsearch";
import Searchbar from "../components/mainpage/searchbar";

export default function ButtonUsage() {
  return (
    <div className="w-screen h-screen m-0 bg-white">
      <Searchbar />
      <div className="flex items-center justify-center mx-8 my-8">
        <Jobsearch />
      </div>
    </div>
  );
}
