import React from "react";
import SideBar from "@/components/layout/SideBar";
import UploadForm from "./components/UploadForm";

const Upload = () => {
  return (
    <div className=" flex justify-between md:px-5">
      <SideBar />
      <UploadForm />
    </div>
  );
};

export default Upload;
