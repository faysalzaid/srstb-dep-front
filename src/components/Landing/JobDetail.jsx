import React, { useEffect, useState } from "react";
import { BiMoney } from "react-icons/bi";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom";
import LandingPageNavBar from "./LandingPageNavBar";
import BlogFooter from "./BlogFooter";

export default function JobDetail() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(" http://localhost:3200/jobs/" + id)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const ApplyJob = () => {
    window.location.replace("/jobs/" + id + "/apply");
  };

  return (
    <>
      <LandingPageNavBar />

      <div className=" pt-10 mx-auto mb-20" style={{ width: "70%" }}>
        <p className=" mb-6 font-semibold text-3xl ">{data.type}</p>

        <p className=" mb-3">
          <span>Published on </span>
          {data.date}
        </p>

        <div
          className=" flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-md text-sm mb-5"
          style={{ width: "fit-content" }}
        >
          <BiMoney />
          <span>Estimated</span>
          <span>{data.salary}</span>
          <span>Birr a year</span>
        </div>

        <main>
          <p className=" font-semibold text-xl mb-5">Job description</p>
          <p className=" mb-3">{data.short_desc}</p>
          <p className=" mb-3">{data.long_desc}</p>

          <p className=" font-semibold text-xl mb-5">Required skills </p>
          <ul className=" mb-5">
            {data.req_skills
              ? data.req_skills.map((arr, index) => (
                  <li
                    key={index}
                    style={{ marginLeft: "7%" }}
                    className=" list-disc"
                  >
                    {arr}
                  </li>
                ))
              : "No Requirement"}
          </ul>

          <p className=" font-semibold text-xl mb-5">Responsibilities</p>
          <ul className=" ml-3 list-disc">
            {data.responisiblity
              ? data.responisiblity.map((arr, index) => (
                  <li key={index}>{arr}</li>
                ))
              : "No Responisiblity"}
          </ul>
        </main>

        <div className=" mt-6">
          <button
            className=" w-full px-5 py-2 bg-purple-500 rounded-md text-white"
            onClick={ApplyJob}
          >
            Apply now
          </button>
        </div>
      </div>

      <BlogFooter />
    </>
  );
}
