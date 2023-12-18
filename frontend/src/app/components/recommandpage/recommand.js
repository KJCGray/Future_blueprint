'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

function Recommand({recvalue}) {
  const [work,setwork]=useState([]);
  //const { certificate, language, edu, major } = router.query;
  async function Joblist() {
    console.log(recvalue);
    try {
      const response = await axios.post(`http://localhost:5000/api/joblist`, {
        certificate:recvalue.certificate,
        language_req:recvalue.language,
        edu:recvalue.edu,
        job_skill:recvalue.other,
      });
      setwork(response.data);
      console.log(work);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    Joblist();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-auto pt-6 w-96'>
        <div className='text-xl font-semibold text-yellow-900'>
          個人化工作推薦
        </div>
        <div className='flex items-center justify-center w-auto bg-orange-100 h-72 rounded-xl'>
          {work.length > 0 ? (
          <div className="w-auto overflow-auto text-yellow-950 h-60 no-scrollbar">
            {work.map((Work) => (
              <div key={Work} className="w-auto p-2 m-2 border-b border-zinc-300">
                <Link href={Work.company_url} className="font-semibold">{Work.job_name}</Link>
              </div>
            ))}
          </div>
          ) : (
          <div className="flex items-center justify-center">
            <div className="font-semibold text-yellow-950">沒有推薦工作</div>
          </div>
          )}
        </div>
    </div>
  )
}

export default Recommand;
