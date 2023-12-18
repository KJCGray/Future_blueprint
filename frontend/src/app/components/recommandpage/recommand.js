'use client';
import React, { useState, useEffect } from "react";
import {parseCookies} from "nookies";
import { useRouter } from "next/navigation";
import axios from "axios";

const Recommand = () => {

  async function Joblist() {
    try {
      const response = await axios.post(`http://localhost:5000/api/joblist`, {
        username: username,
        token: token,
        userid:userid,
        certificate:certificate,
        language:language,
        edu:edu,
        skill:major,
      });
      console.log("工作推薦:",response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-auto h-auto mb-16'>
        <div className='text-xl font-semibold text-yellow-900'>
          個人化工作推薦
        </div>
        <div className='flex items-center justify-center w-3/5 bg-orange-100 h-96 rounded-xl'>
        </div>
    </div>
  )
}

export default Recommand;
