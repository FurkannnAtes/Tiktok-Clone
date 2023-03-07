import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { BsFillChatDotsFill, BsSuitHeartFill } from "react-icons/bs";
import { RiShareForwardLine } from "react-icons/ri";

import { show } from "@/store/showAuth";

//toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Comment from "./Comment";
import {
  followOrUnfollow,
  getSinglePost,
  likeOrUnlike,
  leaveAComment,
  getSingleUser,
} from "@/helpers/Api";
import { Link } from "react-router-dom";

const PostInfo = ({ params, post, postedByUser }) => {
  const [newComment, setNewComments] = useState("");
  const [followers, setFollowers] = useState([]);

  const [currentComments, setCurrentComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  useEffect(() => {
    getSinglePost(params.id).then((res) => {
      setLikes(res.likes);
      setCurrentComments(res.comments);
      getSingleUser(res.userId).then((res) => setFollowers(res.followers));
    });
  }, [params.id]);

  //copy link
  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:5173/post/${params.id}`);
    copyToastify();
  };

  const copyToastify = () => toast.success("Link Copied");
  return (
    <div className="bg-white hidden md:flex w-4/12  flex-col   ">
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
      <div className="flex flex-col gap-2 p-5">
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5">
              <Link to={`/profile/${post.userId}`}>
                <img
                  src={postedByUser?.picture}
                  className="h-16 rounded-full"
                  alt=""
                />
              </Link>
              <div className="flex flex-col ">
                <div className="text-lg font-semibold">
                  {postedByUser?.userName}
                </div>
                <div className="text-sm">
                  @{postedByUser?.userName} -{" "}
                  {postedByUser?._updatedAt?.split("", 10)}
                </div>
              </div>
            </div>
          </div>
          {postedByUser?.subId === user.sub ? null : (
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
        <div>{post?.caption}</div>
        <div className="first-letter:uppercase hover:underline cursor-pointer">
          #{post?.topic}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div
                onClick={() =>
                  likeOrUnlike(post._id, user).then((res) => setLikes(res))
                }
                className={`${
                  likes?.find((i) => i._key === user.sub) ? "text-mainRed" : ""
                } bg-gray-100 p-2 rounded-full hover:text-mainRed duration-300 cursor-pointer`}
              >
                <BsSuitHeartFill className="text-xl " />
              </div>
              {likes?.length}{" "}
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-gray-100 p-2 rounded-full">
                <BsFillChatDotsFill className="text-xl " />
              </div>
              {currentComments?.length}{" "}
            </div>
          </div>
          <div onClick={handleCopy}>
            <RiShareForwardLine className="text-3xl cursor-pointer " />
          </div>
        </div>
      </div>
      <div className="h-full justify-end overflow-y-auto py-5 bg-[#F8F8F8] border-y p-5 flex flex-col-reverse gap-5 commentScroll">
        {currentComments?.map((comment, i) => (
          <Comment
            post={post}
            setCurrentComments={setCurrentComments}
            key={i}
            comment={comment}
          />
        ))}
      </div>
      <div className="h-[150px] flex items-center  p-5">
        {user.name ? (
          <div className="w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                leaveAComment(post._id, user, newComment).then((res) => {
                  setCurrentComments(res);
                  setNewComments("");
                });
              }}
            >
              <input
                className="w-full  outline-none rounded-md p-2 border"
                placeholder="Add Comment..."
                type="text"
                value={newComment}
                onChange={(e) => setNewComments(e.target.value.trimStart())}
              />
            </form>
          </div>
        ) : (
          <button
            onClick={() => dispatch(show())}
            className="text-mainRed font-semibold w-full text-left py-5 rounded-md bg-[#F8F8F8] border px-2"
          >
            Sign in to post a comment
          </button>
        )}
      </div>
    </div>
  );
};

export default PostInfo;
