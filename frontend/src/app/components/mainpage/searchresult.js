import React from "react";
import Link from "next/link";

function SearchResult({ Jobdata }) {
  return (
    <div className="w-3/4 h-auto p-2 mx-12">
      {Jobdata.map((jobs) => (
        <div className="w-full h-48 p-2 border border-solid border-zinc-300" key={jobs.job_num}>
          <div className="w-auto m-1 text-lg font-semibold">{jobs.job_name}</div>
          <div>
            <div className="m-1 text-sm">
              {jobs.serial_name} | {jobs.company_type}
            </div>
            <div className="mx-1 my-4 text-sm">
              <span className="w-auto p-1 mx-1 text-sm font-semibold rounded-lg bg-zinc-300">
                #{jobs.area}{" "}
              </span>
              <span className="w-auto p-1 mx-1 text-sm font-semibold rounded-lg bg-zinc-300">
                #{jobs.exp}
              </span>
              <span className="w-auto p-1 mx-1 text-sm font-semibold rounded-lg bg-zinc-300">
                #{jobs.edu}
              </span>
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-5/6 h-16 overflow-auto whitespace-pre-line no-scrollbar">{jobs.job_content}</div>
            <div className="p-2 mt-auto ml-auto text-sm bg-orange-200 rounded-md w-28 h-fit hover:bg-orange-300">
              <Link href={jobs.job_url}>查看工作詳情</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResult;
