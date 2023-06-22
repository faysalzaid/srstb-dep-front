import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import './blog-post.css' 

export default function OurPosts() {
  const [blogData, setBlogData] = useState();
  let history = useHistory()

  useEffect(() => {
    fetch("http://localhost:3200/blog-posts")
      .then((res) => res.json())
      .then((json) => setBlogData(json));
  }, []);

  const displayDetail = (id) => {
    history.push(`/${id}`)
    window.scrollTo (0, 0);
  }

  return (
    <section className=" mt-6">
      <p className=" font-semibold text-2xl text-center mb-5">Our Posts</p>

      <main className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogData ? (
          blogData.map((post, index) => (
            <article
            key={post.id}
              className=" border border-gray-200 rounded-md flex flex-col p-3 cursor-pointer"
              onClick={() => displayDetail(post.id)}
            >
              <section className=" post_image_container">
                <img src={post.img} className=" w-full h-full rounded-md" />
              </section>
              <section className=" post_info_container mt-3">
                <p className=" text-gray-400 text-sm ">
                  <span className=" text-black">Published on </span>
                  {post.date}
                </p>

                <p className=" long_top_title text-xl font-semibold mt-3">
                  {post.top_title}
                </p>

                <p className=" short_sub_title text-sm text-gray-400 mt-3">
                  {post.sub_title}
                </p>
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