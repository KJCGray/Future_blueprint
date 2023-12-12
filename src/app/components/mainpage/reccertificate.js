import React from "react";

function reccertificate({ Certificates }) {
  return (
    <div className="overflow-auto border border-solid h-1/3 border-zinc-300">
      {Certificates.map((certificate) => (
        <div key={certificate} className="w-auto p-2 m-2 border-b border-zinc-300">
          {certificate}
        </div>
      ))}
    </div>
  );
}

export default reccertificate;
