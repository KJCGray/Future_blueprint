import React from "react";

function SearchResult({ Jobdata }) {
  return (
    <div className="w-3/4 h-auto p-2 mx-12">
      {Jobdata.map((jobs) => (
        <div
          className="w-full h-48 p-2 border border-solid border-zinc-300"
          key={jobs.job_num}
        >
          <div className="w-auto m-1 text-lg font-semibold">
            {jobs.job_name}
          </div>{" "}
          <div className="m-1 text-sm">
            {jobs.serial_name} | {jobs.company_type}
          </div>
          <div className="mx-1 my-4 text-sm">
            <span className="w-auto p-1 mx-1 text-sm font-semibold rounded-lg bg-zinc-300">#{jobs.area} </span>
            <span className="w-auto p-1 mx-1 text-sm font-semibold rounded-lg bg-zinc-300">#{jobs.exp}</span>
            <span className="w-auto p-1 mx-1 text-sm font-semibold rounded-lg bg-zinc-300">#{jobs.edu}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResult;
