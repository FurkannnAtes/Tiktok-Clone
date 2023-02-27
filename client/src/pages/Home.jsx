import React from "react";
import Post from "../components/home/Post";
import SideBar from "../components/home/SideBar";

const Home = () => {
  return (
    <div className="wrapper flex justify-between md:px-5 ">
      <SideBar />
      <div className="w-11/12 md:w-7/12 pt-5 px-1 flex flex-col h-[89vh] overflow-y-auto posts">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Home;
