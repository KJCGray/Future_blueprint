import React from "react";

function reclanguage({ Language }) {
  return (
    <div className="overflow-auto border border-solid h-1/3 border-zinc-300">
      {Language.map((Language) => (
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

export default reclanguage;
