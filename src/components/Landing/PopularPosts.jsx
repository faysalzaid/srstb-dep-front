import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import './blog-post.css'

export default function PopularPosts() {
  const [blogData, setBlogData] = useState([]);
  const [popularPost, setPopularPost] = useState();
  let history = useHistory()

  useEffect(() => {
    fetch("http://localhost:3200/blog-posts")
      .then((res) => res.json())
      .then((json) => setBlogData(json));
  }, []);

  let popular = blogData.filter((post) => post.popular);

  const displayDetail = (id) => {
    history.push(`/${id}`)
    window.scrollTo (0, 0);
  }

  return (
    <section className=" mt-20">
      <p className=" text-2xl font-semibold text-center mb-5">Popular Posts</p>

      <main className=" popular_posts_container flex gap-5 overflow-scroll">
        {popular.map((post) => (
          <article
            key={post.id}
            className=" popular_post rounded-md border border-gray-300 p-3 cursor-pointer "
            onClick={() => displayDetail(post.id)}
          >
            <section className="popular_post_img_container">
              <img src={post.img} className=" w-full h-full rounded-md" />
            </section>

            <section className=" mt-3 flex flex-col gap-3">
              <p className=" text-gray-400 text-sm">
                <span className=" text-black">Published on </span>
                {post.date}
              </p>

              <p className=" long_top_title text-xl font-semibold ">
                {post.top_title}
              </p>

              <p className=" short_sub_title text-gray-400 text-sm">
                {post.sub_title}
              </p>
            </section>
          </article>
        ))}
      </main>
    </section>
  );
}
