import React from "react";

//icons
import { RiShareForwardLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
//toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Content = () => {
  const params = useParams();
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
              src="https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1646315618666501~c5_100x100.jpeg?x-expires=1677780000&x-signature=Y4Sg8Ha997BitYsMMCFbqeSn4WU%3D"
              alt=""
            />
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-semibold">willsmith</div>
              <div>Will Smith</div>
              <div>
                {" "}
                <button className="flex justify-center gap-2 items-center font-semibold text-white bg-mainRed border py-1 w-[200px] hover:bg-[#e7314f] text-lg duration-300 rounded-md">
                  Follow
                </button>
              </div>
            </div>
          </div>
          <div onClick={() => handleCopy()} className="cursor-pointer">
            <RiShareForwardLine className="text-3xl " />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-5 text-lg">
          <div className="flex items-center gap-2">
            <strong>27</strong>
            <div>Takip Edilen</div>
          </div>
          <div className="flex items-center gap-2">
            <strong>73M</strong>
            <div>Takipçiler</div>
          </div>
          <div className="flex items-center gap-2">
            <strong>510M</strong>
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
      </div>
    </div>
  );
};

export default Content;
