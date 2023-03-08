import React, { useEffect, useState } from "react";

//icons
import { RiShareForwardLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
//toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Mypost from "./Mypost";
import { followOrUnfollow, getSingleUser, getMyPosts } from "@/helpers/Api";
import Skeleton from "react-loading-skeleton";

const Content = () => {
  const [singleUser, setSingleUser] = useState({});
  const [myPosts, setMyPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const params = useParams();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    getSingleUser(params.id).then((res) => {
      setSingleUser(res);
      setFollowers(res.followers);
      getMyPosts(res._id).then((res) => setMyPosts(res));
    });
  }, [params.id]);

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
              className="w-28 h-28 bg-gray-600 rounded-full"
              src={singleUser?.picture}
              alt=""
            />
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-semibold">
                {singleUser?.userName || <Skeleton className="w-32" />}
              </div>
              <div>{singleUser?.userName || <Skeleton className="w-32" />}</div>
              <div>
                {" "}
                {singleUser?.subId === user?.sub ? null : (
                  <div>
                    {singleUser?.subId === user.sub ? null : followers?.find(
                        (i) => i._key === user.sub
                      ) ? (
                      <button
                        onClick={async () => {
                          const res = await followOrUnfollow(
                            singleUser.subId,
                            user
                          );
                          setFollowers(res);
                        }}
                        className="border-mainRed border p-1 px-2 w-full rounded-md  font-semibold text-mainRed hover:bg-[#FFF3F5] duration-300 "
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        onClick={async () => {
                          const res = await followOrUnfollow(
                            singleUser.subId,
                            user
                          );
                          setFollowers(res);
                        }}
                        className="border-mainRed border p-1 px-2 w-full rounded-md  font-semibold text-mainRed hover:bg-[#FFF3F5] duration-300 "
                      >
                        Follow
                      </button>
                    )}
                  </div>
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
