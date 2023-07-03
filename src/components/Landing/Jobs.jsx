import React, { useEffect, useState } from "react";
import LandingPageNavBar from "./LandingPageNavBar";
import { BiMoney } from "react-icons/bi";
import BlogFooter from "./BlogFooter";
import { Link } from "react-router-dom/cjs/react-router-dom";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3200/jobs")
      .then((res) => res.json())
      .then((json) => setJobs(json));
  }, []);

  console.log(jobs);

  const ApplyJob = (id) => {
    window.location.replace("/jobs/" + id + "/apply");
  };

  return (
    <div>
      <LandingPageNavBar />
      <p className=" text-2xl text-center font-meduim my-6">Available Jobs</p>

      <main
        className=" job_section grid sm:grid-cols-1 md:grid-cols-2 gap-6"
        style={{ margin: "0 5%" }}
      >
        {jobs ? (
          jobs.map((job) => (
            <article
              key={job.id}
              className=" grid gap-3 border border-gray-300 rounded-md p-5"
            >
              <p className=" font-semibold text-lg ">{job.type}</p>

              <p className=" text-gray-400 text-sm ">
                <span className=" text-black">Added on </span>
                {job.date}
              </p>

              <p className=" text-gray-500 mb-4">{job.short_desc}</p>

              <div
                className=" flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-md text-sm"
                style={{ width: "fit-content" }}
              >
                <BiMoney />
                <span>Estimated</span>
                <span>{job.salary}</span>
                <span>Birr a year</span>
              </div>

              <div className=" flex justify-between ">
                <button className=" text-blue-400 underline cursor-pointer">
                  <Link to={`/jobs/${job.id}`}>Learn More</Link>
                </button>
                <button
                  className=" bg-purple-500 text-white py-2 px-6 rounded-md "
                  onClick={() => ApplyJob(job.id)}
                >
                  Apply
                </button>
              </div>
            </article>
          ))
        ) : (
          <p>Available Jobs Not Found</p>
        )}
      </main>

      <BlogFooter />
    </div>
  );
}
