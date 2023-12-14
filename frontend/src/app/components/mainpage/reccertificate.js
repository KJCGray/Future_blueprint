import React from "react";

function reccertificate({ Certificates }) {
  return (
    <div className="overflow-auto border border-solid border-zinc-300 h-1/3">
      {Certificates.map((Certificate) => (
        <div key={Certificate} className="w-auto p-2 m-2 border-b border-zinc-300">
          <div className="font-semibold ">{Certificate.skill}</div>
          <div className="text-sm align-baseline">
            {Certificate.count}項工作要求
          </div>
        </div>
      ))}
    </div>
  );
}

export default reccertificate;
