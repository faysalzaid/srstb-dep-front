import React, { useContext } from "react";
import HeroSection from "./HeroSection";
import OurPosts from "./OurPosts";
import PopularPosts from "./PopularPosts";
import BlogFooter from "./BlogFooter";
import "./blog-post.css";
import LandingPageNavBar from "./LandingPageNavBar";
import TitleChange from "components/Title/Title";
import { AuthContext } from "hooks/authContext";

export default function BlogPost() {
  const {settings} = useContext(AuthContext)
  return (
    <section className="  blog_post_section">
      <TitleChange name={`Home |${settings.name}`}/>
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
