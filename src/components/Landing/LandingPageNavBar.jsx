import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { IoBagSharp } from "react-icons/io5";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./blog-post.css";

export default function LandingPageNavBar() {
  let navigate = useHistory();

  const showDashboard = () => {
    navigate.push("/app/dashboard");
  };
  const showJobs = () => {
    navigate.push("/jobs");
  };

  const homePage = () => {
    navigate.push("/");
    window.scrollTo(0, 0);
  };

  return (
    <nav className=" blog_post_nav grid grid-cols-3 gap-4 border-b border-gray-300">
      {/* Left */}
      <div className=" blog_post_nav_left relative flex items-center">
        <BiSearch className=" absolute z-0" style={{ left: "10px" }} />
        <input
          className=" blog_post_search_input relative z-10 h-full bg-transparent border border-gray-300 p-3 pl-10"
          placeholder="Search..."
        />
      </div>

      {/* Middle */}
      <div className=" blog_post_nav_middle flex items-center">
        <p
          className=" w-full font-medium text-2xl text-center "
          onClick={homePage}
        >
          SRS-RB
        </p>
      </div>

      {/* Right */}
      <div className=" blog_post_nav_right flex justify-between items-center px-4">
        <section className=" flex">
          <BsTwitter className=" box-content p-3 border border-white rounded-md hover:border-gray-300 text-sm cursor-pointer" />
          <FaFacebookF className=" box-content p-3 border border-white rounded-md hover:border-gray-300 text-sm cursor-pointer" />
          <BsInstagram className=" box-content p-3 border border-white rounded-md hover:border-gray-300 text-sm cursor-pointer" />
        </section>
        <section className=" flex items-center">
          <span
            className=" box-content p-3 border border-transparent rounded-md hover:border-gray-300 cursor-pointer"
            onClick={showJobs}
          >
            Jobs
          </span>
          <span
            className=" box-content p-3 border border-transparent rounded-md hover:border-gray-300 cursor-pointer"
            onClick={showDashboard}
          >
            Dashboard
          </span>
        </section>
      </div>
    </nav>
  );
}
