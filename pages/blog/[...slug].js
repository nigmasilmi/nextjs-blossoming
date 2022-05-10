import { useRouter } from "next/router";

const BlogPostPage = () => {
  const router = useRouter();
  console.log(router.query);
  return <div>BlogPostPage</div>;
};

export default BlogPostPage;
