import React, { useEffect, useState } from "react";
import LandingPageNavBar from "./LandingPageNavBar";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3200/jobs")
      .then((res) => res.json())
      .then((json) => setJobs(json));
  }, []);

  console.log(jobs);

  return (
    <div>
      <LandingPageNavBar />
      <p className=" text-2xl text-center font-meduim my-6">Available Jobs</p>

      <main
        className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        style={{ margin: "0 5%" }}
      >
        {jobs ? (
          jobs.map((job) => (
            <article
              key={job.id}
              className=" border border-gray-300 rounded-md p-3"
            >
              <p className=" font-semibold my-2">{job.type}</p>

              <p className=" text-gray-400 text-sm mb-2">
                <span className=" text-black">Added on </span>
                {job.date}
              </p>

              <p className=" mb-2">{job.short_desc}</p>

              <div className=" flex justify-between mb-2">
                <button className=" text-blue-400 underline cursor-pointer">
                  Learn More
                </button>
                <button className=" bg-indigo-500 text-white py-2 px-6 rounded-md">
                  Apply
                </button>
              </div>
            </article>
          ))
        ) : (
          <p>Available Jobs Not Found</p>
        )}
      </main>
    </div>
  );
}
