import React, { useEffect, useState } from "react";

import Post from "../components/home/Post";
import SideBar from "../components/home/SideBar";
import { client } from "../utils/client";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    getAllPosts();
    getAllUsers();
  }, []);

  //Get All Posts
  const getAllPosts = async () => {
    try {
      const query = `*[_type == "post"]`;
      const results = await client.fetch(query);
      setAllPosts(results);
    } catch (error) {
      console.log(error);
    }
  };
  //Get All Users
  const getAllUsers = async () => {
    try {
      const query = `*[_type == "user"]`;
      const results = await client.fetch(query);
      setAllUsers(results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper flex justify-between md:px-5 ">
      <SideBar />

      <div className="w-11/12 md:w-7/12 pt-5 px-1 flex flex-col h-[89vh] overflow-y-auto posts">
        {allPosts?.map((post, i) => (
          <Post key={i} post={post} allUsers={allUsers} />
        ))}
      </div>
    </div>
  );
};

export default Home;
