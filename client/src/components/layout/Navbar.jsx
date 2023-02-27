import React from "react";

//icons
import { FaTiktok } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className=" border-b  border-[1px]">
      <div className="wrapper flex justify-between items-center px-5 h-[9vh]">
        <div className="flex gap-2 items-center">
          <FaTiktok className="text-2xl" />
          <div className="text-3xl font-extrabold">TikTok</div>
        </div>
        <div className="overflow-hidden hidden md:flex  items-center bg-[#F1F1F2]  rounded-full border py-0 pl-5">
          <input
            placeholder="Search"
            type="text"
            className="outline-none bg-transparent"
          />
          <div className=" text-gray-400  h-full py-2 hover:bg-gray-300 cursor-pointer duration-300">
            <button className="border-l  border-[#cacacc] px-3">
              <BsSearch />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex gap-2 justify-center items-center font-semibold border py-2 w-[130px] hover:bg-gray-200 duration-300">
            <AiOutlinePlus />
            <div>Upload</div>
          </button>
          <button className="flex justify-center gap-2 items-center font-semibold text-white bg-mainRed border py-2 w-[130px] hover:bg-[#d11e3c] duration-300">
            <div>Sing in</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
