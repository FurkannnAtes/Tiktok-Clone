import React, { useState } from "react";

//icons
import { SlCloudUpload } from "react-icons/sl";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
//toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { client } from "../../utils/client";

const UploadForm = () => {
  const [uploadVideo, setUploadVideo] = useState();
  const [capture, setCapture] = useState("");
  const [category, setCategory] = useState("action");
  const [isLoading, setIsLoading] = useState(false);

  //upload video
  const uploadVideoHandle = async (e) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];
    if (fileTypes.includes(selectedFile.type)) {
      setIsLoading(true);
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setUploadVideo(data);
          setIsLoading(false);
        });
    } else {
      falseFileType();
      setIsLoading(false);
    }
  };
  //Cancel Post
  const handleDiscardPost = () => {
    setUploadVideo();
    setCapture("");
    setCategory("action");
  };
  //Handle Post
  const handlePost = (e) => {
    e.preventDefault();
  };

  const falseFileType = () => toast.error("False video type");
  return (
    <div className="w-full flex items-center justify-center p-5">
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

      {uploadVideo ? (
        <form onSubmit={handlePost}>
          <div className="flex gap-5 ">
            <video
              className="h-full w-[350px] border-[3px] rounded-md  border-dashed p-2"
              src={uploadVideo?.url}
              controls
            ></video>
            <div className="flex flex-col justify-between h-auto">
              <div>
                <label className="flex flex-col gap-1">
                  <div>Capture</div>
                  <input
                    className="outline-none border rounded-sm py-1"
                    type="text"
                    value={capture}
                    onChange={(e) => setCapture(e.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <div>Choose Category</div>
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    className="outline-none border rounded-sm  py-1"
                    name="category"
                    id="category"
                    value={category}
                  >
                    <option value="action">Action</option>
                    <option value="comedy">Comedy</option>
                    <option value="software">Software</option>
                    <option value="drama">Drama</option>
                  </select>
                </label>
              </div>
              <div className="flex gap-2 py-2">
                <button
                  onClick={handleDiscardPost}
                  className="bg-white border w-[100px] py-1  rounded-sm"
                  type="button"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="bg-mainRed boder border-mainRed text-white w-[100px] px-4 py-1  rounded-sm"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : isLoading ? (
        <div className="animate-spin text-4xl text-mainRed">
          <AiOutlineLoading3Quarters />
        </div>
      ) : (
        <label className="flex flex-col gap-5 border-[3px] w-full rounded-md p-5 border-dashed hover:bg-gray-100 cursor-pointer ">
          <input onChange={uploadVideoHandle} type="file" className="hidden" />
          <div className="flex flex-col gap-2 items-center">
            <SlCloudUpload className="text-5xl text-gray-300" />
            <div className="font-extrabold text-xl">Upload Video</div>
            <div className="text-gray-300 font-semibold">
              MP4 or Webm or ogg
            </div>
            <div className="text-gray-300 font-semibold">
              720x1280 or higher
            </div>
            <div className="text-gray-300 font-semibold">Up to 10 minutes</div>
            <div className="text-gray-300 font-semibold">Less than 2GB</div>
            <div className="bg-mainRed text-white px-5 py-1 mt-2 rounded-md font-semibold">
              <button>Select File</button>
            </div>
          </div>
        </label>
      )}
    </div>
  );
};

export default UploadForm;
