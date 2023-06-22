import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import LandingPageNavBar from "./LandingPageNavBar";
import "./blog-post.css";
import BlogFooter from "./BlogFooter";

export default function BlogDetail() {
  const { id } = useParams();
  const [blogData, setBlogData] = useState([]);
  const [allData, setAllData] = useState([]);
  let history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:3200/blog-posts`)
      .then((res) => res.json())
      .then((json) => setAllData(json));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3200/blog-posts/${id}`)
      .then((res) => res.json())
      .then((json) => setBlogData(json));
  }, []);

  const thisTopic = blogData.topic;

  // const AllRelated =allData.filter((obj) => {
  //       return obj.topic.some((t) => thisTopic.includes(t));
  //     })

  // const AllRelated = allData.filter((data) =>
  //   data.topic.some((post) => thisTopic.includes(post))
  // );

  const AllRelated = allData.filter((data) => {
    for (let post of data.topic) {
      if (thisTopic?.includes(post)) {
        return true;
      }
    }
    return false;
  });

  const relatedTopics = AllRelated
    ? AllRelated.filter((post) => post.id !== blogData.id)
    : "";

  const showRelated = (id) => {
    window.location.replace(`/${id}`);
  };

  return (
    <div>
      <LandingPageNavBar />

      <main className=" post_deatail_container mt-10 mb-10 mx-auto">
        <p className=" text-center text-gray-400">
          <span className=" text-gray-400">Published on </span>
          {blogData.date}
        </p>

        <p className=" text-center text-2xl mt-3">{blogData.top_title}</p>

        <p className=" text-gray-400 text-center mt-3 leading-relaxed">
          {blogData.sub_title}
        </p>

        <div>
          <img className=" w-full h-auto mt-12 rounded-md" src={blogData.img} />
        </div>

        <p className=" text-gray-700 mt-12 leading-loose">{blogData.content}</p>
      </main>

      <section className=" related_posts_container mx-auto mt-10 mb-10">
        <p className=" text-2xl font-semibold mb-5">Related</p>
        {relatedTopics.length > 0 ? (
          <section className=" flex flex-col gap-6">
            {relatedTopics.map((post) => (
              <article
                key={post.id}
                className=" related_post_container flex gap-5 border border-gray-200 p-3 cursor-pointer"
                onClick={() => showRelated(post.id)}
              >
                <section
                  className=" related_post_img_container"
                  style={{
                    background: `url(${post.img})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></section>
                <section className=" related_post_txt_container flex flex-col justify-center">
                  <p className=" text-sm text-gray-400">
                    <span className=" text-black">Published on </span>
                    {post.date}
                  </p>
                  <p className=" short_top_title text-xl font-semibold my-3">
                    {post.top_title}
                  </p>
                  <p className=" short_sub_title text-sm text-gray-400">
                    {post.sub_title}
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
