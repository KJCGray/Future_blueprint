import React from "react";

function recommendskills({ Skills }) {
  return (
    <div className="flex flex-col overflow-auto border border-solid h-1/3 border-zinc-300">
      {Skills.length > 0 ? (
        <div>
          {Skills.map((Skill) => (
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

export default recommendskills;
