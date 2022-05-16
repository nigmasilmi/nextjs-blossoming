import { Fragment } from "react";
import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";

const DUMMY_POSTS = [
  {
    slug: "getting-started-with-nextjs1",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is the React Framework for production - it makes building fullstack React apps a breeze and ships with built-in SSR",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-with-nextjs2",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is the React Framework for production - it makes building fullstack React apps a breeze and ships with built-in SSR",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-with-nextjs3",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is the React Framework for production - it makes building fullstack React apps a breeze and ships with built-in SSR",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-with-nextjs4",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is the React Framework for production - it makes building fullstack React apps a breeze and ships with built-in SSR",
    date: "2022-02-10",
  },
];

const HomePage = () => {
  return (
    <Fragment>
      <h1>Home Page</h1>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </Fragment>
  );
};

export default HomePage;

// 1) Hero
// 2) Featured Posts
