import React from "react";

function recommendskills({ Skills }) {
  return (
    <div className="overflow-auto border border-solid h-1/3 border-zinc-300">
      <div>
        {Skills.map((skill) => (
          <div key={skill} className="w-auto p-2 m-2 border-b border-zinc-300">{skill}</div>
        ))}
      </div>
    </div>
  );
}

export default recommendskills;
