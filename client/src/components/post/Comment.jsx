import React from "react";

import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { client } from "../../utils/client";
const Comment = ({ comment, post, currentComments, getCurrentComments }) => {
  const user = useSelector((state) => state.user.user);

  //delete comment
  const deleteHandleComment = async () => {
    try {
      const newList = currentComments.filter((i) => i._key !== comment._key);

      await client.patch(post._id).set({ comments: newList }).commit();
      getCurrentComments();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-start gap-2 relative group">
      {user?.sub === comment.userId ? (
        <div
          onClick={deleteHandleComment}
          className="absolute top-0 right-0 hidden group-hover:flex text-mainRed cursor-pointer"
        >
          <AiOutlineClose />
        </div>
      ) : null}
      <img src={comment?.picture} alt="" className="w-12 h-12 rounded-full" />
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold">{comment?.userName}</div>
        <div>{comment.comment}</div>
      </div>
    </div>
  );
};

export default Comment;
