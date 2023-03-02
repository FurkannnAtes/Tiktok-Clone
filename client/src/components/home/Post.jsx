import React from "react";

//icons
import { BsFillChatDotsFill, BsSuitHeartFill } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
import { useSelector } from "react-redux";

const Post = ({ post }) => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="py-5 border-b flex flex-col gap-1">
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <img
            className="w-14 h-14 rounded-full"
            src={post.postedBy.picture}
            alt=""
          />
          <div className="flex flex-col">
            <div className="text-lg font-semibold">
              {post.postedBy.userName}
            </div>
            <div className="text-md"> {post.postedBy.userName}</div>
          </div>
        </div>
        <div>
          {post?.postedBy.userId === user.sub ? null : (
            <button className="border-mainRed border p-1 px-2 w-full rounded-md  font-semibold text-mainRed hover:bg-[#FFF3F5] duration-300 ">
              Follow
            </button>
          )}
        </div>
      </div>
      <div className="mx-16">
        <div>{post.caption}</div>
      </div>
      <div className="flex items-end gap-2 ml-16">
        <video
          src={post.video}
          className="min-h-[500px] w-[336px] bg-black rounded-md "
          controls
        ></video>
        <div className="flex flex-col items-center gap-2">
          <button className="bg-gray-200 p-4 rounded-full">
            <BsSuitHeartFill className="text-2xl" />
          </button>
          <div className="text-sm font-semibold">{post.likes?.length}</div>
          <button className="bg-gray-200 p-4 rounded-full">
            <BsFillChatDotsFill className="text-2xl" />
          </button>
          <div className="text-sm font-semibold">{post.comments?.length}</div>
          <button className="bg-gray-200 p-4 rounded-full">
            <IoMdShareAlt className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
