import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "@/utils/client";

import PostVideo from "./components/PostVideo";
import PostInfo from "./components/PostInfo";
const Post = () => {
  const [post, setPost] = useState([]);
  const [prevPostId, setPrevPostId] = useState("");
  const [nextPostId, setNextPostId] = useState("");
  const [postedByUser, setPostedByUser] = useState({});

  const params = useParams();
  useEffect(() => {
    getSinglePost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const getSinglePost = async () => {
    try {
      const query = `*[_type == "post" && _id == "${params.id}"]`;
      const results = await client.fetch(query);
      setPost(results[0]);
      getPostedByUser(results[0].postedBy._ref);
      getPreviusPost(results[0]);
      getNextPost(results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  //Get PostedBy User
  const getPostedByUser = async (userId) => {
    try {
      const query = `*[_type == "user" && _id == "${userId}"][0]`;
      const results = await client.fetch(query);
      setPostedByUser(results);
    } catch (error) {
      console.log(error);
    }
  };

  //Get Previus Post
  const getPreviusPost = async (post) => {
    try {
      const query = `*[_type == "post" && dateTime(_createdAt) > dateTime('${post._createdAt}')]| order(_createdAt desc)`;
      const results = await client.fetch(query);

      setPrevPostId(results[results.length - 1]?._id);
    } catch (error) {
      console.log(error);
    }
  };
  //Get Previus Post
  const getNextPost = async (post) => {
    try {
      const query = `*[_type == "post" && dateTime(_createdAt) < dateTime('${post._createdAt}')]| order(_createdAt desc)`;
      const results = await client.fetch(query);
      setNextPostId(results[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <PostVideo prevPostId={prevPostId} nextPostId={nextPostId} post={post} />
      <PostInfo params={params} post={post} postedByUser={postedByUser} />
    </div>
  );
};

export default Post;
