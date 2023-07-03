import axios from "axios";
import { url } from "constants";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import './blog-post.css' 
import ReactHtmlParser from 'react-html-parser';

export default function OurPosts() {
  const [blogData, setBlogData] = useState([]);
  let history = useHistory()

  useEffect(() => {
    const getData = async()=>{

      await axios.get(`${url}/blog`,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
  
        }else{
          setBlogData(resp.data)
        }
      })
    }
    getData()
  }, []);



  return (
    <section className=" mt-6">
      <p className=" font-semibold text-2xl text-center mb-5">Our Posts</p>

      <main className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogData ? (
          blogData.map((post, index) => (
            <article
            key={post.id}
              className=" border border-gray-200 rounded-md flex flex-col p-3 cursor-pointer"
             
            >
              <section className=" post_image_container">
                <Link to={`/${post.id}`}>
                <img src={post.image} className=" w-full h-full object-cover rounded-md" />
                </Link>
               
              </section>
              <section className="post_info_container mt-6">
              <p className="text-gray-400 text-sm">
                <span className="text-black">Published on </span>
                {post.date}
              </p>

              <h3 className="long_top_title text-xl font-semibold mt-3">
                {post.title}
              </h3>

              <span className="short_sub_title text-sm text-gray-400 mt-3">
                {ReactHtmlParser(post.description.slice(0, 30))}
              </span>
            </section>
            </article>
          ))
        ) : (
          <p>No Data Is Found</p>
        )}
      </main>
    </section>
  );
}

{/* <Link to={{pathname:`/${post.id}`}} key={post.id}> */}