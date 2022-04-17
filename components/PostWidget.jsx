import { getRecentPosts, getSimiliarPosts } from "../Services";
import { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";

const PostWidget = ({ categories, slug }) => {
  const [posts, setPosts] = useState([]);

  const get_data = async () => {
    const data = await getRecentPosts();
    setPosts(data);
  };

  useEffect(() => {
    if (slug) {
      getSimiliarPosts(
        slug,
        categories.map((item) => item.slug)
      ).then((response) => setPosts(response));
    } else {
      get_data();
    }
  }, [slug]);

  return (
    <div className="bg-white mb-6 p-4 rounded-lg shadow-lg">
      <div className="pb-3 border-b ">
        <h3 className="text-xl font-bold">
          {slug ? "Related Posts" : "Recent Posts"}
        </h3>
      </div>
      <div className="w-full py-3">
        {posts.map((item, id) => {
          const { featuredimage } = item;
          return (
            <div key={id} className="w-full flex items-center mt-2">
              <img
                src={featuredimage.url}
                className="mr-2 w-[42px] h-[42px] rounded-full"
              />
              <div className="ml-3">
                <p className="text-gray-600 font-normal">
                  {moment(item.createdAt).format("MMM DD,YYYY")}
                </p>
                <h5 className="font-semibold text-base transition duration-200 hover:text-pink-600">
                  <Link href={`/post/${item.slug}`}>{item.title}</Link>
                </h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostWidget;
