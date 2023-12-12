import React from "react";

function reclanguage ({Language}) {
  return (
    <div className="overflow-auto border border-solid h-1/3 border-zinc-300">
    {Language.map((language) => (
      <div key={language} className="w-auto p-2 m-2 border-b border-zinc-300">{language}</div>
    ))}
    </div>
  );
};

export default reclanguage;
