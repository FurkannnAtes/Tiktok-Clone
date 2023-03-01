import React from "react";
import SideBar from "../components/home/SideBar";
import UploadForm from "../components/upload/UploadForm";

const Upload = () => {
  return (
    <div className=" flex justify-between md:px-5">
      <SideBar />
      <UploadForm />
    </div>
  );
};

export default Upload;
