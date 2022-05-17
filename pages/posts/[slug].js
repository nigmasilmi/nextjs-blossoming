import { Fragment } from "react";
import Head from "next/head";
import PostContent from "../../components/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

const PostDetailPage = (props) => {
  const { post } = props;
  return (
    <Fragment>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  );
};

export function getStaticPaths() {
  const slugs = getPostsFiles().map((file) => file.replace(/\.md$/, ""));
  const possiblePaths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths: possiblePaths,
    fallback: false,
  };
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;
  const postData = getPostData(slug);
  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export default PostDetailPage;
