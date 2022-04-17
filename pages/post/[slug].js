import {
  PostWidget,
  PostCard,
  Author,
  Comments,
  CommentForm,
  Categories,
  PostDetail,
} from "../../components";
import { getPosts, getPostDetails } from "../../Services";
import Head from "next/head";
import { AdjacentPost } from '../../section';

const PostDetails = ({ post, title }) => {
  return (
    <div className="relative w-[90%] px-10 mx-auto">
      <Head>
        <title>Blog | {title}</title>
      </Head>
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-10">
        <div className="col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <AdjacentPost createdAt={post.createdAt} slug={post.slug}/>
          <CommentForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="lg:stick relative col-span-8 lg:col-span-4">
          <PostWidget slug={post.slug} categories={post.categories} />
          <Categories />

        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const data = await getPosts();
  const slugs = data.map((item) => ({ params: { slug: item.node.slug } }));

  return {
    paths: slugs,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const postDetails = await getPostDetails(params.slug);
  return {
    props: {
      post: postDetails,
      title: params.slug,
    },
  };
}

export default PostDetails;
