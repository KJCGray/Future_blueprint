import React from "react";

function reccertificate({ Certificates }) {
  return (
    <div className="overflow-auto border border-solid border-zinc-300 h-1/3">
      {Certificates.map((certificate) => (
        <div key={certificate} className="w-auto p-2 m-2 border-b border-zinc-300">
          {certificate}
        </div>
      ))}
    </div>
  );
}

export default reccertificate;
