import React, { useEffect, useState } from "react";

import Post from "@/components/Post";
import SideBar from "@/components/layout/SideBar";
import { getAllPosts, getAllUsers } from "@/helpers/Api";
import Skeletons from "../../components/skeleton/Skeleton";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    getAllPosts().then((res) => setAllPosts(res));
    getAllUsers().then((res) => setAllUsers(res));
  }, []);

  return (
    <div className="wrapper flex justify-between md:px-5 ">
      <SideBar />

      <div className="w-11/12 md:w-7/12 pt-5 px-1 flex flex-col h-[89vh] overflow-y-auto posts">
        {allPosts?.map((post, i) => (
          <Post key={i} post={post} allUsers={allUsers} />
        ))}
        {allPosts.length === 0 ? <Skeletons type="post" /> : null}
      </div>
    </div>
  );
};

export default Home;
