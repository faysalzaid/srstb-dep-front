import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import LandingPageNavBar from "./LandingPageNavBar";
import BlogFooter from "./BlogFooter";
import "./blog-post.css";

export default function ApplyJob() {
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png?w=1380&t=st=1687491158~exp=1687491758~hmac=2a4c9b7bc2cf2552dfddbb66e5a1dd54bb3c2fcd54e783a7f54dfda1bfd00455"
  );
  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:3200/jobs/" + id)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  const uploadImg = (e) => {
    let image = URL.createObjectURL(e.target.files[0]);
    setProfile(image);
  };

  return (
    <div className=" job_application">
      <LandingPageNavBar />

      <main>
        <p className=" font-semibold text-2xl text-center mt-10 mb-16">
          {data.type}
        </p>

        <form className=" mx-auto " style={{ width: "90%", maxWidth: "700px" }}>
          <div className=" mb-5 flex flex-col md:flex-row p-2 gap-3 items-center ">
            <img src={profile} className=" w-40 h-40 rounded-full border" />
            <label
              htmlFor="upload-profile"
              className=" py-2 px-5 bg-gray-200 rounded-md text-sm cursor-pointer"
            >
              Upload Profile
            </label>
            <input
              type="file"
              accept="image/*"
              id="upload-profile"
              className=" hidden"
              onChange={uploadImg}
            />
          </div>

          <section className=" grid sm:grid-cols-1 md:grid-cols-2 gap-5">
            <div className=" flex flex-col">
              <label>Full Name</label>
              <input
                type="text"
                className=" bg-transparent border border-gray-300 rounded-md py-2 px-3  capitalize"
                placeholder="Salim Sulaiman Salah"
              />
            </div>

            <div className=" flex flex-col">
              <label>Education Level</label>
              <input
                type="text"
                className=" bg-transparent border border-gray-300 rounded-md py-2 px-3 capitalize"
                placeholder="Bachelor's degree"
              />
            </div>

            <div className=" flex flex-col">
              <label>Gender</label>
              <select className=" bg-transparent border border-gray-300 rounded-md py-2 px-3">
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className=" flex flex-col">
              <label>Nationality</label>
              <input
                type="text"
                className=" bg-transparent border border-gray-300 rounded-md py-2 px-3 capitalize"
                placeholder="Somali"
              />
            </div>

            <div className=" flex flex-col">
              <label>Phone Number</label>
              <input
                type="tel"
                className=" bg-transparent border border-gray-300 rounded-md py-2 px-3"
                placeholder="0912345678"
              />
            </div>

            <div className=" flex flex-col">
              <label>Date of Birth</label>
              <input
                type="date"
                className=" bg-transparent border border-gray-300 rounded-md py-2 px-3"
              />
            </div>
          </section>

          <div className=" w-full mt-5 flex flex-col">
            <label>Email</label>
            <input
              type="email"
              className=" bg-transparent border border-gray-300 rounded-md py-2 px-3"
              placeholder="example@gmail.com"
            />
          </div>

          <button className=" w-full py-2 rounded-md bg-purple-500 text-white mt-10">
            Submit
          </button>
        </form>
      </main>

      <BlogFooter />
    </div>
  );
}
