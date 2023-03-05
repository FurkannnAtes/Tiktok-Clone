import React, { useEffect, useState } from "react";

//icons
import { RiShareForwardLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
//toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { client } from "@/utils/client";
import Mypost from "./Mypost";

const Content = () => {
  const [singleUser, setSingleUser] = useState({});
  const [myPosts, setMyPosts] = useState([]);
  const params = useParams();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    getSingleUser();
    getMyPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  //Get Single User
  const getSingleUser = async () => {
    try {
      const query = `*[_type == "user" && _id == "${params.id}"][0]`;
      const results = await client.fetch(query);
      setSingleUser(results);
    } catch (error) {
      console.log(error);
    }
  };
  //Get MyPosts
  const getMyPosts = async () => {
    try {
      const query = `*[_type == "post" && userId =="${params.id}"]`;
      const results = await client.fetch(query);

      setMyPosts(results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:5173/profile/${params.id}`);
    copyToastify();
  };
  const copyToastify = () => toast.success("Link Copied");
  return (
    <div className="w-full p-5 flex flex-col max-h-[89vh] overflow-y-auto hideScroll">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between w-fit gap-10">
          <div className="flex items-center gap-2">
            <img
              className="w-28 h-28 rounded-full"
              src={singleUser?.picture}
              alt=""
            />
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-semibold">
                {singleUser?.userName}
              </div>
              <div>{singleUser?.userName}</div>
              <div>
                {" "}
                {singleUser?.subId === user?.sub ? null : (
                  <button className="flex justify-center gap-2 items-center font-semibold text-white bg-mainRed border py-1 w-[200px] hover:bg-[#e7314f] text-lg duration-300 rounded-md">
                    Follow
                  </button>
                )}
              </div>
            </div>
          </div>
          <div onClick={() => handleCopy()} className="cursor-pointer">
            <RiShareForwardLine className="text-3xl " />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-5 text-lg">
          <div className="flex items-center gap-2">
            <strong>{singleUser?.follows?.length}</strong>
            <div>Takip Edilen</div>
          </div>
          <div className="flex items-center gap-2">
            <strong>{singleUser?.followers?.length}</strong>
            <div>Takipçiler</div>
          </div>
          <div className="flex items-center gap-2">
            <strong>{singleUser?.likes?.length}</strong>
            <div>Beğeniler</div>
          </div>
        </div>
        <div className="max-w-[400px] text-center md:text-start">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab doloribus
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-5 mx-auto sm:mx-0">
        <div className="text-xl font-semibold px-20 border-b-2 border-black w-fit">
          Videos
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {myPosts?.map((post, i) => (
            <Mypost post={post} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
