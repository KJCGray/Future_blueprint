import React, { useState, useEffect } from "react";
import axios from "axios";

function Forumskill({ jobname }) {
    const [skills, setSkill] = useState([]);
    useEffect(() => {
      fetchskill();
    }, []);
    async function fetchskill() {
      const styleName = "";
      const areaName = "";
      try {
        const response = await axios.post(`http://localhost:5000/api/searchskill`, {
          job_L_class: jobname,
          job_type: styleName,
          area: areaName,
        });
        setSkill(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div className="overflow-auto border border-solid border-zinc-300 h-[400px]">
      {skills.length > 0 ? (
        <div>
          {skills.map((Skill) => (
            <div key={Skill} className="w-auto p-2 m-2 border-b border-zinc-300">
              <div className="font-semibold">{Skill.skill}</div>
              <div className="font-semibold">{Skill.tool}</div>
              <div className="text-sm">{Skill.count}項工作要求</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div>此類別沒有推薦技能</div>
        </div>
      )}
    </div>
  );
}

export default Forumskill;
