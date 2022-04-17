import Head from "next/head";
import { PostCard,Categories,PostWidget,Header } from "../components";
import { getPosts } from "../Services";
import { FeaturedPosts } from "../section";



export default function Home({ title,posts }) {
  return (
    <div className="container w-[90%] py-7 mx-auto px-10">
      <Head>
        <title>Blog | {title}</title>
      </Head>      
       <FeaturedPosts/>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 border-red gap-10">      
       <div className="lg:col-span-8 col-span-1">
        <div className="w-full">
         {posts && posts.map((item ,id) => <PostCard post={item.node} key={id}/>)}
        </div>
       </div>
       <div className="lg:col-span-4 col-span-1">
       <div className="relative lg:sticky">
       <PostWidget/>
       <Categories/>
       </div>
       </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = await getPosts() || [];
  return {
    props: {
      title: "Home",
      posts:data
   
    },
  };
}
