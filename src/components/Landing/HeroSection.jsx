import React, { useEffect, useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import "./blog-post.css";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import { url } from "constants";
import { Link } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

export default function HeroSection() {
  const [blogData, setBlogData] = useState([]);
  const [currentIndex, setCurrenIndex] = useState(0);
  // const [trending,]
  let history = useHistory();

  useEffect(() => {
    const getData=async()=> {
      await axios.get(`${url}/blog`).then((resp)=>{
        // console.log(resp.data);
        if(resp.data.error) return
        const data = resp.data.filter((dt)=>dt.trending)
        // console.log('this is the trending',data);
        setBlogData(data)
      })
    }

    getData()
  }, []);



  let indexLength = blogData.length - 1;

  let indexValue = 0;

  const slidetoNext = () => {
    const blogSlider = document.querySelector(".blog_slider");
    indexValue = indexValue >= indexLength ? 0 : indexValue + 1;

    blogSlider.style.transform = `translateX(-${indexValue * 100}%)`;
  };

  const slidetoPrev = () => {
    const blogSlider = document.querySelector(".blog_slider");
    indexValue = indexValue === 0 ? indexLength : indexValue - 1;

    blogSlider.style.transform = `translateX(-${indexValue * 100}%)`;
  };

  // useEffect(() => {
  // setInterval(() => {
  //   slidetoNext();
  //   console.log(indexValue);
  // }, 5000);
  // }, []);


  return (
    <section className=" w-full mt-10 pb-5 ">
      <p className=" text-2xl font-semibold text-center mb-10">Trendings</p>

      <main className=" blog_carousel">
        <div className=" blog_slider flex">
          {blogData.map((post, index) => (
            <article
              key={post.id}
              className=" flex gap-5 cursor-pointer "
            
            >
              <section
                className=" hero_article_section_1 bg-indigo-400"
                style={{
                  width: "50%",
                  height: "100%",
                  background: `url(${post.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* <img src={post.img} className=" hero_post_img w-full h-full" /> */}
                {/* <div className=" hero_post_img  w-full h-full bg-cover bg-center " style={ { background: `ur(${post.img})`}}></div> */}
              </section>

              <section
                className=" hero_article_section_2"
                style={{ width: "50%", height: "100%" }}
              >
                <p className=" text-gray-400 ">
                  <span className=" text-black">Published on </span>
                  {post.date}
                </p>
                <Link to={`/${post.id}`}>
                <p className=" long_top_title hero_top_title text-3xl font-semibold mt-3">
                  {post.title}
                </p>
                </Link>

                <p className=" long_sub_title text-gray-400 mt-3">
                {ReactHtmlParser(post.description.slice(0,30))}
                </p>
                {/* <p className=" long_sub_title text-gray-400 mt-3">{post.content}</p> */}
              </section>
            </article>
          ))}
        </div>

        <div
          className=" carousel_arrow arrow_left absolute top-0 left-0 w-10 h-full flex justify-center items-center cursor-pointer"
          onClick={slidetoPrev}
        >
          <AiOutlineDoubleLeft />
        </div>

        <div
          className=" carousel_arrow arrow_right absolute top-0 right-0 w-10 h-full flex justify-center items-center cursor-pointer"
          onClick={slidetoNext}
        >
          <AiOutlineDoubleRight />
        </div>
      </main>
    </section>
  );
}
