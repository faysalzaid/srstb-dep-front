import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import LandingPageNavBar from "./LandingPageNavBar";
import "./blog-post.css";
import BlogFooter from "./BlogFooter";
import axios from "axios";
import { url } from "constants";
import ReactHtmlParser from 'react-html-parser';

export default function BlogDetail() {
  const { id } = useParams();
  const [blogData, setBlogData] = useState({});
  const [allData, setAllData] = useState([]);
  let history = useHistory();



    useEffect(() => {
      const getData = async()=>{
  
        await axios.get(`${url}/blog/${id}`,{withCredentials:true}).then(async(resp)=>{
          if(resp.data.error){
    
          }else{
            const fdata = resp.data
            setBlogData(resp.data)
            await axios.get(`${url}/blog`,{withCredentials:true}).then((resp)=>{
              const data = resp.data.filter((dt)=>dt.BlogCategoryId===fdata.BlogCategoryId)
              const newData = data.filter((dt)=>dt.id!==fdata.id)
              // console.log(newData∫∫∫∫);
              setAllData(newData)
            })
          }
        })
      }
      getData()
    }, [id]);


  const thisTopic = blogData.topic;

  // const AllRelated =allData.filter((obj) => {
  //       return obj.topic.some((t) => thisTopic.includes(t));
  //     })

  // const AllRelated = allData.filter((data) =>
  //   data.topic.some((post) => thisTopic.includes(post))
  // );




 

  return (
    <div>
      <LandingPageNavBar />

      <main className=" post_deatail_container mt-10 mb-10 mx-auto">
        <p className=" text-center text-gray-400">
          <span className=" text-gray-400">Published on </span>
          {blogData.date}
        </p>

        <p className=" text-center text-2xl mt-3">{blogData.title}</p>

      

        <div>
          <img className=" w-full h-auto mt-12 rounded-md" src={blogData.image} />
        </div>

            <p className=" text-gray-700 mt-12 leading-loose">{ReactHtmlParser(blogData.description)}</p>
      </main>

      <section className=" related_posts_container mx-auto mt-10 mb-10">
        <p className=" text-2xl font-semibold mb-5">Related</p>
        {allData.length > 0 ? (
          <section className=" flex flex-col gap-6">
            {allData.map((post) => (
              <article
                key={post.id}
                className=" related_post_container flex gap-5 border border-gray-200 p-3 cursor-pointer"
               
              >
                <section
                  className=" related_post_img_container "
                  style={{
                    background: `url(${post.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></section>
                <section className=" related_post_txt_container flex flex-col justify-center">
                  <p className=" text-sm text-gray-400">
                    <span className=" text-black">Published on </span>
                    {post.date}
                  </p>
                  <Link to={`/${post.id}`}>

                  <p className=" short_top_title text-xl font-semibold my-3">
                    {post.title}
                  </p>

                  </Link>
                  <p className=" short_sub_title text-sm text-gray-400">
                    {/* {post} */}Category | {post?.BlogCategory?.name}
                  </p>
                </section>
              </article>
            ))}
          </section>
        ) : (
          <p>Related posts are not founded</p>
        )}
      </section>

      <BlogFooter />
    </div>
  );
}
