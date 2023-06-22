import React from "react";
import './blog-post.css'

export default function BlogFooter() {
  return (
    <section className=" blog_footer_container">
      <footer className=" blog_footer w-full py-20 bg-gray-100 ">
        <p className=" text-xl font-semibold">Subscribe to SRS-RB news</p>
        <main className=" footer_main flex gap-3">
          <div className=" " style={{ width: "70%" }}>
            <input
              className=" w-full p-3 rounded-md border border-gray-300 bg-white"
              placeholder="example@gmail.com"
            />
          </div>
          <div style={{ width: "30%" }}>
            <button className=" w-full py-3 rounded-md bg-orange-400 text-white hover:bg-white hover:text-orange-400 font-semibold transition-all duration-300 ease-linear">
              Subscribe
            </button>
          </div>
        </main>
      </footer>
    </section>
  );
}
