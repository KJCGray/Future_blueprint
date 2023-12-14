import * as React from "react";
import Button from "@mui/material/Button";
import Navbar from "../components/navbar";
import Jobsearch from "../components/mainpage/jobsearch";
import Searchbar from "../components/mainpage/searchbar";

export default function ButtonUsage() {
  return (
    <div className="w-auto min-h-screen m-0 bg-white">
      <Searchbar />
      <div className="flex items-center justify-center h-auto mx-8 my-8">
        <Jobsearch />
      </div>
    </div>
  );
}
