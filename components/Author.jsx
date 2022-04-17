import React from "react";

const Author = ({ author }) => {
  return (
    <div className="bg-gray-700 mt-10 mb-8 bg-opacity-50 text-center rounded-lg relative p-4">
      <div className="w-full flex justify-center absolute left-0 -top-6">
        <img
          src={author.photo.url}
          alt={author.name}
          className="w-[54px] h-[54px] rounded-full"
        />
      </div>
      <h2 className="text-2xl mt-7 font-bold text-white">{author.name}</h2>
      <p className="font-normal text-white text-base">{author.bio}</p>
    </div>
  );
};

export default Author;
