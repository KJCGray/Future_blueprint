'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";

const Recommand = () => {
  const [certificate,setcertificate]=useState("丙級");
  const [language,setlanguage]=useState("英文");
  const [edu,setedu]=useState("輔仁大學");
  const [major,setmajor]=useState("程式設計");
  
  async function Joblist() {
    try {
      const response = await axios.post(`http://localhost:5000/api/joblist`, {
        certificate:certificate,
        language_req:language,
        edu:edu,
        job_skill:major,
      });
      console.log("工作推薦:",response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    Joblist();
  }, []);

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
