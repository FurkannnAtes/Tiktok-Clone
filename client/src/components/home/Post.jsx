import React from "react";

//icons
import { BsFillChatDotsFill, BsSuitHeartFill } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
const Post = () => {
  return (
    <div className="py-5 border-b flex flex-col gap-1">
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-1">
          <img
            className="w-14 h-14 rounded-full"
            src="https://i.pinimg.com/originals/3a/d6/eb/3ad6eb0c16eebeab5bafa2804dd08b19.jpg"
            alt=""
          />
          <div className="flex flex-col">
            <div className="text-lg font-semibold">Furkan</div>
            <div className="text-md">FurkanAtes</div>
          </div>
        </div>
        <div>
          <button className="border-mainRed border p-1 px-2 w-full rounded-md  font-semibold text-mainRed hover:bg-[#FFF3F5] duration-300 ">
            Follow
          </button>
        </div>
      </div>
      <div className="mx-16">
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, nam.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, nam.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, nam.
        </div>
      </div>
      <div className="flex items-end gap-2 ml-16">
        <div className="min-h-[450px] w-[300px] bg-black rounded-md "></div>
        <div className="flex flex-col items-center gap-2">
          <button className="bg-gray-200 p-4 rounded-full">
            <BsSuitHeartFill className="text-2xl" />
          </button>
          <div className="text-sm font-semibold">11.2k</div>
          <button className="bg-gray-200 p-4 rounded-full">
            <BsFillChatDotsFill className="text-2xl" />
          </button>
          <div className="text-sm font-semibold">11.2k</div>
          <button className="bg-gray-200 p-4 rounded-full">
            <IoMdShareAlt className="text-2xl" />
          </button>
          <div className="text-sm font-semibold">11.2k</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
