import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../utils/client";

const Post = () => {
  const [post, setPost] = useState([]);
  const params = useParams();
  useEffect(() => {
    getSinglePost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);
  console.log(post);

  const getSinglePost = async () => {
    try {
      const query = `*[_type == "post" && _id == "${params.id}"]`;
      const results = await client.fetch(query);
      setPost(results[0]);
      console.log(results[0]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex w-full h-screen">
      <div className="h-full w-full md:w-8/12 bg-[url('https://wallpapers-clan.com/wp-content/uploads/2020/09/tik-tok-logo-black-wallpaper-scaled.jpg')] bg-cover bg-center ">
        <div className="h-full w-full backdrop-blur-md flex items-center justify-center">
          <video
            className="h-full w-[400px] object-cover"
            src={post?.video}
            controls
          ></video>
        </div>
      </div>
      <div className="bg-white hidden md:flex w-4/12  flex-col ">
        <div>
          <div className="flex justify-between items-center">
            <div>{post.posted}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
