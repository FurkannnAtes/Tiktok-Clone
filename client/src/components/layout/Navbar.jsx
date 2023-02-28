import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
//icons
import { FaTiktok } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { createOrGetUser, logout } from "../../store/Auth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [authBtn, setAuthBtn] = useState(false);
  const [profileBtn, setProfileBtn] = useState(false);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

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
          {user.name ? (
            <div onMos className="relative">
              <img
                onClick={() => setProfileBtn(profileBtn ? false : true)}
                className="w-10 h-10 rounded-full cursor-pointer"
                src={user.picture}
                alt=""
              />
              <div
                className={`${
                  profileBtn ? "flex" : "hidden"
                } absolute top-full left-1/2 -translate-x-1/2 z-30 p-2 border bg-white flex flex-col gap-2 w-[100px]`}
              >
                <Link to="/">GO Profile</Link>
                <div>
                  {" "}
                  <button onClick={() => dispatch(logout())}>Log out</button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setAuthBtn(authBtn ? false : true)}
              className="flex justify-center gap-2 items-center font-semibold text-white bg-mainRed border py-2 w-[130px] hover:bg-[#d11e3c] duration-300"
            >
              <div>Sing in</div>
            </button>
          )}
        </div>
      </div>
      <div
        onClick={() => setAuthBtn(false)}
        className={`${
          authBtn ? "flex " : "hidden"
        } fixed top-0 left-0 z-30 backdrop-blur-md w-screen bg-transparent h-screen items-center justify-center`}
      >
        <div className="bg-white p-5 rounded-lg">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              dispatch(createOrGetUser(credentialResponse));
              setAuthBtn(false);
              setProfileBtn(false);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
