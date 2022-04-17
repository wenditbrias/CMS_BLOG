import React, { useState, useEffect } from "react";
import { getComments } from "../Services";
import moment from "moment";

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComments(slug).then((response) => setComments(response));
  }, [slug]);
  return (
    <div className="bg-white p-4 mb-8 rounded-lg shadow-lg mt-8">
      <div className="pb-3 border-b">
        <h2 className="font-bold text-lg">{comments.length} comment</h2>
      </div>
      <div className="w-full py-4">
        {comments.map((item, key) => {
          return (
            <div className="w-full mb-3 border-b pb-3" key={key}>
              <div className="flex items-center">
                <h5 className="font-semibold text-gray-600">{item.name}</h5>
                <p className="font-normal text-gray-500 ml-2">
                  {moment(item.createdAt).format("MMM DD,YYYY")}
                </p>
              </div>
              <p className="mt-1 font-normal text-gray-500">{item.comment}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
