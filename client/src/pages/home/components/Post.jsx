import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//icons
import { BsFillChatDotsFill, BsSuitHeartFill } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
import { useSelector } from "react-redux";

//toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  followOrUnfollow,
  likeOrUnlike,
  getSinglePost,
  getSingleUser,
} from "@/helpers/Api";

const Post = ({ post, allUsers }) => {
  const [likes, setLikes] = useState([]);
  const [followers, setFollowers] = useState([]);

  const user = useSelector((state) => state.user.user);
  const postedByUser = allUsers?.filter((i) => i.subId === post.postedBy._ref);

  useEffect(() => {
    getSinglePost(post._id).then((res) => {
      setLikes(res.likes);
      getSingleUser(res.userId).then((res) => {
        setFollowers(res.followers);
      });
    });
  }, [post._id]);

  //copy link
  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:5173/post/${post._id}`);
    copyToastify();
  };
  const copyToastify = () => toast.success("Link Copied");
  return (
    <div className="py-5 border-b flex flex-col gap-1">
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <img
            className="w-14 h-14 rounded-full"
            src={postedByUser[0]?.picture}
            alt=""
          />
          <div className="flex flex-col">
            <div className="text-lg font-semibold">
              {postedByUser[0]?.userName}
            </div>
            <div className="text-md"> {postedByUser[0]?.userName}</div>
          </div>
        </div>
        {postedByUser[0]?.subId === user.sub ? null : (
          <div>
            {followers?.subId === user.sub ? null : followers?.find(
                (i) => i._key === user.sub
              ) ? (
              <button
                onClick={async () => {
                  const res = await followOrUnfollow(post.userId, user);
                  setFollowers(res);
                }}
                className="border-mainRed border p-1 px-2 w-full rounded-md  font-semibold text-mainRed hover:bg-[#FFF3F5] duration-300 "
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={async () => {
                  const res = await followOrUnfollow(post.userId, user);
                  setFollowers(res);
                }}
                className="border-mainRed border p-1 px-2 w-full rounded-md  font-semibold text-mainRed hover:bg-[#FFF3F5] duration-300 "
              >
                Follow
              </button>
            )}
          </div>
        )}
      </div>
      <div className="mx-16">
        <div>{post.caption}</div>
      </div>
      <div className="flex items-end gap-2 ml-16">
        <Link to={`/post/${post._id}`}>
          <video
            src={post.video}
            className="min-h-[500px] w-[336px] bg-black rounded-md "
            controls
          ></video>
        </Link>
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => {
              likeOrUnlike(post._id, user).then((res) => setLikes(res));
            }}
            className={`${
              likes?.find((i) => i._key === user.sub) ? "text-mainRed" : ""
            } bg-gray-200 p-4 rounded-full hover:text-mainRed duration-300`}
          >
            <BsSuitHeartFill className="text-2xl" />
          </button>
          <div className="text-sm font-semibold">{likes?.length}</div>
          <Link
            to={`/post/${post._id}`}
            className="bg-gray-200 p-4 rounded-full cursor-pointer"
          >
            <BsFillChatDotsFill className="text-2xl" />
          </Link>
          <div className="text-sm font-semibold">{post.comments?.length}</div>
          <button onClick={handleCopy} className="bg-gray-200 p-4 rounded-full">
            <IoMdShareAlt className="text-2xl" />
          </button>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Post;
