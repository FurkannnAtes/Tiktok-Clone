import React from "react";
import { useParams } from "react-router-dom";
import SideBar from "../components/home/SideBar";
import Content from "../components/profile/Content";

const Profile = () => {
  const params = useParams();
  console.log(params.id);
  return (
    <div className=" flex justify-between md:px-5">
      <SideBar />
      <Content />
    </div>
  );
};

export default Profile;
