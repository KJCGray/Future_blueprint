import React, { useState, useEffect } from "react";
import axios from "axios";

function Forumlan({ jobname }) {
  const [language, setLanguage] = useState([]);
  useEffect(() => {
    fetchlanguage();
  }, []);

  async function fetchlanguage() {
    const styleName = "";
    const areaName = "";
    try {
      const response = await axios.post(`http://localhost:5000/api/searchlanguage`, {
        job_L_class: jobname,
        job_type: styleName,
        area: areaName,
      });
      setLanguage(response.data);
      console.log("Language");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="overflow-auto border border-solid border-zinc-300 h-[400px]">
      {language.map((Language) => (
        <div key={Language} className="w-auto p-2 m-2 border-b border-zinc-300">
          <div className="font-semibold">{Language.language}</div>
          <div key={Language} className="w-auto ml-auto">
            <div className="text-sm">{Language.job_count}項工作要求</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Forumlan;
