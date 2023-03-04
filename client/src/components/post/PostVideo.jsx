import React, { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
const PostVideo = ({ post }) => {
  const [showPlayBtn, setShowPlayBtn] = useState(true);

  const bgVideoRef = useRef(null);
  const videoRef = useRef(null);
  //Video handleFunction
  const handleVideoControls = () => {
    if (videoRef?.current.paused) {
      bgVideoRef?.current.pause();
      setShowPlayBtn(true);
    } else {
      bgVideoRef?.current.play();
      setShowPlayBtn(false);
    }
  };
  return (
    <div className="h-full w-full md:w-8/12  relative">
      <div className="w-full h-full absolute left-0 top-0 z-10 bg-black overflow-hidden">
        <video
          src={post?.video}
          muted
          ref={bgVideoRef}
          className="h-full w-full  object-cover blur-md grayscale-[50%]"
        ></video>
      </div>
      <div
        onClick={() => {
          videoRef.current.paused
            ? videoRef.current.play()
            : videoRef.current.pause();
        }}
        className="h-full w-full  flex items-center cursor-pointer  justify-center relative z-40"
      >
        <video
          ref={videoRef}
          controlsList="nofullscreen"
          onPlay={handleVideoControls}
          onPause={handleVideoControls}
          onTimeUpdate={(e) =>
            (bgVideoRef.current.currentTime = e.target.currentTime)
          }
          onClick={handleVideoControls}
          className="h-full w-[400px] object-cover"
          src={post?.video}
          controls
        ></video>
        <button
          className={`${
            showPlayBtn ? "flex" : "hidden"
          } absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-white`}
        >
          <FaPlay className="text-5xl" />
        </button>
      </div>
    </div>
  );
};

export default PostVideo;
