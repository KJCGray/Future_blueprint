import React,{useState, useEffect} from "react";
import axios from "axios";

function Forumcer({jobname}) {
    const [certificate, setCertificate] = useState([]);
    useEffect(()=>{
        fetchCertificate();
    },[])
    async function fetchCertificate() {
      const styleName = "";
      const areaName = "";
      try {
        const response = await axios.post(`http://localhost:5000/api/searchCertificate`, {
          job_L_class: jobname,
          job_type: styleName,
          area: areaName,
        });
        setCertificate(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div className="overflow-auto border border-solid border-zinc-300 h-[400px]">
      {certificate.map((Certificate) => (
        <div key={Certificate} className="w-auto p-2 m-2 border-b border-zinc-300">
          <div className="font-semibold ">{Certificate.certificates}</div>
          <div className="text-sm align-baseline">
            {Certificate.count}項工作要求
          </div>
        </div>
      ))}
    </div>
  );
}

export default Forumcer;