import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { BsFillChatDotsFill, BsSuitHeartFill } from "react-icons/bs";
import { RiShareForwardLine } from "react-icons/ri";

import { show } from "../../store/showAuth";
import { uid } from "uid";
//toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { client } from "../../utils/client";
import Comment from "./Comment";
const PostInfo = ({ params, post, postedByUser }) => {
  const [newComment, setNewComments] = useState("");
  const [currentComments, setCurrentComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Get Current comment
  const getCurrentComments = async () => {
    try {
      const query = `*[_type == "post" && _id == "${params.id}"][0]`;
      const results = await client.fetch(query);
      setCurrentComments(results.comments);
      setLikes(results.likes);
    } catch (error) {
      console.log(error);
    }
  };

  //copy link
  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:5173/post/${params.id}`);
    copyToastify();
  };

  //Leave a comment
  const leaveCommentHandle = async (e) => {
    e.preventDefault();
    if (newComment.trimStart() === "") {
      setNewComments("");
    } else {
      try {
        const newList = [
          ...currentComments,
          {
            _key: uid(),
            userName: user?.name,
            picture: user?.picture,
            comment: newComment,
            userId: user?.sub,
          },
        ];
        await client.patch(post._id).set({ comments: newList }).commit();
        setNewComments("");
        getCurrentComments();
      } catch (error) {
        console.log(error);
      }
    }
  };

  //handleLike
  const handleLike = async () => {
    if (!user.name) {
      dispatch(show());
    } else if (likes.find((i) => i.subId === user.sub)) {
      const newList = likes.filter((i) => i.subId !== user.sub);

      try {
        await client.patch(post._id).set({ likes: newList }).commit();
        getCurrentComments();
      } catch (error) {
        console.log(error);
      }
    } else {
      const newUser = {
        _key: user.sub,
        userName: user.name,
        picture: user.picture,
        subId: user.sub,
      };
      const newList = [...likes, newUser];
      try {
        await client.patch(post._id).set({ likes: newList }).commit();
        getCurrentComments();
      } catch (error) {
        console.log(error);
      }
    }
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
              <div>
                <img
                  src={postedByUser?.picture}
                  className="h-16 rounded-full"
                  alt=""
                />
              </div>
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
          <div className="w-fit">
            {postedByUser?.subId === user.sub ? null : (
              <button className="border-mainRed border p-1 px-2 w-full rounded-md  font-semibold text-mainRed hover:bg-[#FFF3F5] duration-300 ">
                Follow
              </button>
            )}
          </div>
        </div>
        <div>{post?.caption}</div>
        <div className="first-letter:uppercase hover:underline cursor-pointer">
          #{post?.topic}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div
                onClick={handleLike}
                className={`${
                  likes?.find((i) => i.subId === user.sub) ? "text-mainRed" : ""
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
            getCurrentComments={getCurrentComments}
            currentComments={currentComments}
            post={post}
            key={i}
            comment={comment}
          />
        ))}
      </div>
      <div className="h-[150px] flex items-center  p-5">
        {user.name ? (
          <div className="w-full">
            <form onSubmit={leaveCommentHandle} action="">
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
