import React from "react";
import Router from "next/router";
import internal from "stream";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
    image: string;
    customImage: string;
    customName: string;
  } | null;
  content: string;
  published: boolean;
  publishedDate: Date;
  lastModified: Date;
  comments: Number;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const user = post.author;
  console.log(user)
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)} className="transition duration-500 cursor-pointer hover:scale-105 flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-4 max-w-md md:max-w-2xl ">
        <div className="flex items-start px-4 py-6 w-full">
          <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src={user.customImage??user.image} alt="avatar" />
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-lg font-semibold text-gray-900 -mt-1">{post.title} </h2>
              <small className="text-sm text-gray-700">22h ago</small>
            </div>
            <p className="text-gray-700">By {user.customName??user.name}</p>
            <p className="mt-3 text-gray-700 text-sm">
              {post.content}
            </p>
            <div className="mt-4 flex items-center">
              <div className="flex mr-2 text-gray-700 text-sm mr-8">
                <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <span>{post.comments??0}</span>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Post;
