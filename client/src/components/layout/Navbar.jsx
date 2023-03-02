import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { createOrGetUser, logout } from "../../store/Auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
//icons
import { FaTiktok } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineUser } from "react-icons/ai";
import { BsFillTriangleFill, BsSearch } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

const Navbar = () => {
  const [authBtn, setAuthBtn] = useState(false);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const userValid = ["/upload"];

  useEffect(() => {
    if (!user.name && userValid.includes(location.pathname)) {
      navigate("/");
    }
  }, [location.pathname, navigate, user, userValid]);

  //check user login
  const handleUploadLink = () => {
    if (user.name) {
      navigate("/upload");
    } else {
      setAuthBtn(true);
    }
  };

  return (
    <div className=" border-b  border-[1px]">
      <div
        className={`${
          location.pathname === "/" ? " wrapper" : ""
        }  flex justify-between items-center px-5 h-[9vh]`}
      >
        <Link to="/" className="flex gap-2 items-center">
          <FaTiktok className="text-2xl" />
          <div className="text-3xl font-extrabold">TikTok</div>
        </Link>
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
          <button
            onClick={() => handleUploadLink()}
            className="flex gap-2 justify-center items-center font-semibold border py-2 w-[130px] hover:bg-gray-200 duration-300"
          >
            <AiOutlinePlus />
            <div>Upload</div>
          </button>
          {user.name ? (
            <div className="relative group">
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src={user.picture}
                alt=""
              />
              <div
                className={`group-hover:flex group-hover:opacity-100 absolute top-[130%] right-0 z-30  shadow-lg bg-white hidden flex-col  w-[140px] rounded-lg `}
              >
                <div className="absolute bottom-full w-full pt-5 flex justify-end pr-3 text-white right-0">
                  <BsFillTriangleFill />
                </div>
                <Link
                  className="hover:bg-gray-100 duration-300 p-2 flex items-center gap-2"
                  to={`/profile/${user.sub}`}
                >
                  <AiOutlineUser className="text-xl" />
                  <div> Your Profile</div>
                </Link>
                <div
                  onClick={() => dispatch(logout())}
                  className="hover:bg-gray-100 duration-300 p-2 flex items-center gap-2 cursor-pointer"
                >
                  <BiLogOut className="text-xl" />
                  <div>Log out</div>
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
