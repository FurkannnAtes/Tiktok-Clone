import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "@/utils/client";

import PostVideo from "./components/PostVideo";
import PostInfo from "./components/PostInfo";
import { getSinglePost } from "@/helpers/Api";
import Skeletons from "../../components/skeleton/Skeleton";
const MyPostDetails = () => {
  const [post, setPost] = useState([]);
  const [prevPostId, setPrevPostId] = useState("");
  const [nextPostId, setNextPostId] = useState("");
  const [postedByUser, setPostedByUser] = useState({});

  const params = useParams();
  useEffect(() => {
    getSinglePost(params.id).then((res) => {
      setPost(res);
      getPostedByUser(res.userId);
      getPreviousPost(res);
      getNextPost(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

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
  const getPreviousPost = async (post) => {
    try {
      const query = `*[_type == "post" && userId =="${post.userId}" && dateTime(_createdAt) > dateTime('${post._createdAt}')]| order(_createdAt desc)`;
      const results = await client.fetch(query);

      setPrevPostId(results[results.length - 1]?._id);
    } catch (error) {
      console.log(error);
    }
  };
  //Get Previus Post
  const getNextPost = async (post) => {
    try {
      const query = `*[_type == "post" && userId =="${post.userId}" && dateTime(_createdAt) < dateTime('${post._createdAt}')]| order(_createdAt desc)`;
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

export default MyPostDetails;
