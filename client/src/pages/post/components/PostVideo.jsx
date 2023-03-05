import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const PostVideo = ({ post, nextPostId, prevPostId }) => {
  const [showPlayBtn, setShowPlayBtn] = useState(true);

  const bgVideoRef = useRef(null);
  const videoRef = useRef(null);
  const params = useParams();
  useEffect(() => {
    videoRef.current.currentTime = 0;
  }, [params.id]);

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
      <Link to="/" className="absolute left-5 top-5 z-50 cursor-pointer">
        <AiOutlineClose className="text-white text-4xl" />
      </Link>
      <div className="flex flex-col gap-5 absolute right-5 z-50 top-1/2 -translate-y-1/2">
        {prevPostId !== undefined ? (
          <Link
            to={`/post/${prevPostId}`}
            className="p-1 rounded-full bg-slate-100 text-lg cursor-pointer"
          >
            <AiOutlineUp />
          </Link>
        ) : (
          <button
            disabled
            className="p-1 rounded-full bg-slate-100 opacity-50 text-lg "
          >
            <AiOutlineUp />
          </button>
        )}
        {nextPostId !== undefined ? (
          <Link
            to={`/post/${nextPostId}`}
            className="p-1 rounded-full bg-slate-100 text-lg cursor-pointer"
          >
            <AiOutlineDown />
          </Link>
        ) : (
          <button
            disabled
            className="p-1 rounded-full bg-slate-100 text-lg opacity-50"
          >
            <AiOutlineDown />
          </button>
        )}
      </div>
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
