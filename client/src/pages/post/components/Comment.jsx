import React from "react";

import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";

import { deleteComment } from "@/helpers/Api";
const Comment = ({ comment, setCurrentComments, post }) => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="flex items-start gap-2 relative group">
      {user?.sub === comment.userId ? (
        <div
          onClick={() =>
            deleteComment(post._id, comment, user).then((res) =>
              setCurrentComments(res)
            )
          }
          className="absolute top-0 right-0 hidden group-hover:flex text-mainRed cursor-pointer"
        >
          <AiOutlineClose />
        </div>
      ) : null}
      <img src={comment?.picture} alt="" className="w-12 h-12 rounded-full" />
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold">{comment?.name}</div>
        <div>{comment.comment}</div>
      </div>
    </div>
  );
};

export default Comment;
