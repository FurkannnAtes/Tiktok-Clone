import React from "react";

import SideBar from "@/components/layout/SideBar";
import Content from "./components/Content";
const Profile = () => {
  return (
    <div className=" flex justify-between md:px-5">
      <SideBar />
      <Content />
    </div>
  );
};

export default Profile;
