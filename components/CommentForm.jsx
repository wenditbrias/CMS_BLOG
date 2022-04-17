import React, { useState, useEffect } from "react";
import { HandleSubmitComment } from "../Services";

const CommentForm = ({ slug }) => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [error, setError] = useState(false);
  const [store, setStore] = useState([]);
  const [formField, setFormField] = useState({
    comment: "",
    email: "",
    name: "",
    storeData: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFormField({
        ...formField,
        name: window.localStorage.getItem("name"),
        email: window.localStorage.getItem("email"),
      });
    }
  }, [slug]);

  const SubmitComment = () => {
    const { comment, email, name } = formField;
    if (comment == "" || email == "" || name == "") {
      return setError(true);
    }

    if (formField.storeData) {
      window.localStorage.setItem("name", formField.name);
      window.localStorage.setItem("email", formField.email);
    } else {
      window.localStorage.removeItem("name", formField.name);
      window.localStorage.removeItem("email", formField.email);
    }

    HandleSubmitComment({ ...formField, slug: slug }).then((res) => {
      setShowSuccessMsg(true);
      setTimeout(() => setShowSuccessMsg(false), 1000);
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-5">
      <div className="border-b pb-3">
        <h2 className="font-bold text-xl">Reply a comment</h2>
      </div>
      <div className="flex pt-4 flex-wrap justify-between items-center">
        <textarea
          onChange={(e) =>
            setFormField({ ...formField, [e.target.name]: e.target.value })
          }
          name="comment"
          className="w-full rounded-md outline-none focus:ring-2 focus:ring-pink-300 h-40 bg-gray-200 p-3"
        ></textarea>
        <input
          type="email"
          name="email"
          value={formField.email}
          onChange={(e) =>
            setFormField({ ...formField, [e.target.name]: e.target.value })
          }
          placeholder="email"
          className="py-2 px-3 rounded-md outline-none focus:ring-2 focus:ring-pink-300 bg-gray-200 w-[49%] mt-3"
        />
        <input
          type="text"
          name="name"
          value={formField.name}
          onChange={(e) =>
            setFormField({ ...formField, [e.target.name]: e.target.value })
          }
          placeholder="username"
          className="py-2 mt-3 rounded-md focus:ring-2 outline-none focus:ring-pink-300 px-3 bg-gray-200 w-[49%]"
        />
        <div className="w-full mt-4">
          <input
            name="storeData"
            type="checkbox"
            className="align-middle mr-2"
            onChange={(e) =>
              setFormField({ ...formField, [e.target.name]: e.target.checked })
            }
          />
          <span className="text-gray-600 align-middle">Remember me?</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={SubmitComment}
          className="bg-pink-600 mt-5 transition duration-300 hover:bg-pink-700 text-base text-white py-3 px-4 rounded-full"
        >
          Post Comments
        </button>
        {showSuccessMsg ? (
          <p className="text-green-400 align-middle font-semibold text-base">
            Comment is submitted
          </p>
        ) : null}
      </div>
      {error ? (
        <p className="mt-4 text-red-500 font-semibold text-base">
          Please complete field!
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default CommentForm;
