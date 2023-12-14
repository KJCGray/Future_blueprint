import React from "react";

function reclanguage({ Language }) {
  return (
    <div className="overflow-auto border border-solid h-1/3 border-zinc-300">
      {Language.map((Language) => (
        <div key={Language} className="flex w-auto p-2 m-2 border-b border-zinc-300">
          <div className="">{Language.language}</div>
          <div key={Language} className="mt-2 ml-4 text-sm">
            <span>
            {Language.job_count}</span>
            <span>
            項工作要求此語言</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default reclanguage;
