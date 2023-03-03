import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//icons
import { BsFillChatDotsFill, BsSuitHeartFill } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { client } from "../../utils/client";
import { show } from "../../store/showAuth";

const Post = ({ post, allUsers }) => {
  const [likes, setLikes] = useState([]);

  const user = useSelector((state) => state.user.user);
  const postedByUser = allUsers?.filter((i) => i.subId === post.postedBy._ref);
  const dispatch = useDispatch();
  useEffect(() => {
    currentLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Get Current Likes
  const currentLikes = async () => {
    try {
      const query = `*[_type == "post" && _id == "${post._id}"]`;
      const results = await client.fetch(query);
      setLikes(results[0].likes);
    } catch (error) {
      console.log(error);
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
        currentLikes();
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
        currentLikes();
      } catch (error) {
        console.log(error);
      }
    }
  };
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
        <div>
          {postedByUser[0]?.subId === user.sub ? null : (
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
        <Link to={`/post/${post._id}`}>
          <video
            src={post.video}
            className="min-h-[500px] w-[336px] bg-black rounded-md "
            controls
          ></video>
        </Link>
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleLike}
            className={`${
              likes.find((i) => i.subId === user.sub) ? "text-mainRed" : ""
            } bg-gray-200 p-4 rounded-full hover:text-mainRed duration-300`}
          >
            <BsSuitHeartFill className="text-2xl" />
          </button>
          <div className="text-sm font-semibold">{likes?.length}</div>
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
