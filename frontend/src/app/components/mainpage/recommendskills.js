import React from "react";

function recommendskills({ Skills }) {
  return (
    <div className="overflow-auto border border-solid h-1/3 border-zinc-300">
      <div>
        {Skills.map((Skill) => (
          <div key={Skill} className="flex w-auto p-2 m-2 border-b border-zinc-300">
            <div>{Skill.skill}</div>
            <div>{Skill.tool}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default recommendskills;
