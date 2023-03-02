import React from "react";

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
    <div className="min-h-[350px] rounded-lg">
      <video
        onMouseEnter={hoverStartVideo}
        onMouseOut={outPauseVideo}
        className="h-full w-full object-fill rounded-lg"
        src={post?.video}
        muted
      ></video>
    </div>
  );
};

export default Mypost;
