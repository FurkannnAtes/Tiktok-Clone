import React from "react";
import { Link } from "react-router-dom";

const Mypost = ({ post }) => {
  //Hover Stat video
  const hoverStartVideo = (e) => {
    e.target.play();
  };
  //Mouse out puse
  const outPauseVideo = (e) => {
    e.target.pause();
    e.target.currentTime = 0;
  };

  return (
    <Link
      to={`/profilePostsDetails/${post._id}`}
      className="min-h-[350px] rounded-lg"
    >
      <video
        onMouseEnter={hoverStartVideo}
        onMouseOut={outPauseVideo}
        className="h-full w-full object-fill rounded-lg"
        src={post?.video}
        muted
      ></video>
    </Link>
  );
};

export default Mypost;
