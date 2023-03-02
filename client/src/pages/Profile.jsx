import React from "react";

import SideBar from "../components/home/SideBar";
import Content from "../components/profile/Content";

const Profile = () => {
  return (
    <div className=" flex justify-between md:px-5">
      <SideBar />
      <Content />
    </div>
  );
};

export default Profile;
