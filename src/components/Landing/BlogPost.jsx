import React from "react";
import HeroSection from "./HeroSection";
import OurPosts from "./OurPosts";
import PopularPosts from "./PopularPosts";
import BlogFooter from "./BlogFooter";
import "./blog-post.css";
import LandingPageNavBar from "./LandingPageNavBar";

export default function BlogPost() {
  return (
    <section className="  blog_post_section">
      <LandingPageNavBar />
      <main className=" mx-auto" style={{ width: "90%" }}>
        <HeroSection />
        <OurPosts />
        <PopularPosts />
      </main>
      <BlogFooter />
    </section>
  );
}
