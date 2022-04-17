import Link from "next/link";
import moment from "moment";
import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";

const PostDetail = ({ post }) => {
  const { featuredimage, author } = post;

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg">
      <div>
        <img
          src={featuredimage.url}
          alt={post.title}
          className="w-full h-[240px]"
        />
        <div className="py-5">
          <h2 className="text-2xl font-bold hover:text-pink-600">
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </h2>
          <div className="flex items-center lg:flex-row flex-col ">
            <div className="flex items-center mt-3 mb-4">
              <img
                src={author.photo.url}
                className="w-[34px] h-[34px] rounded-full"
                alt={author.name}
              />
              <span className="ml-2">{author.name}</span>
            </div>
            <p className="ml-3 flex items-center">
              <AiOutlineCalendar className="text-pink-600 mr-2" />
              {moment(post.createdAt).format("MMM DD , YYYY")}
            </p>
          </div>
          {post.content.raw.children.map((obj, index) => {
            const children = obj.children.map((item, id) =>
              getContentFragment(id, item.text, item)
            );

            return getContentFragment(index, children, obj, obj.type);
          })}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
