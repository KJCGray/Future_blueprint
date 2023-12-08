import React from "react";

function SearchResult({ Jobdata }) {
  return (
    <div className="w-auto h-auto">
      {Jobdata.map((jobs) => (
        <div className="w-3/5 h-48 p-2 ml-2 border border-solid border-zinc-300" key={jobs.job_num}>
          <div className="m-1 text-lg font-semibold">{jobs.job_name}</div>
          <div className="m-1 text-sm">
            {jobs.serial_name} | {jobs.company_type}
          </div>
          <div className="m-1 text-sm">
            <span className="text-sm font-semibold">{jobs.area} </span>
            <span>| </span>
            <span className="text-sm font-semibold">{jobs.exp}</span>
            <span className="text-sm">,</span>
            <span className="text-sm font-semibold">{jobs.edu}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResult;
