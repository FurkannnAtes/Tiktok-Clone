import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrGetUser } from "@/store/Auth";
import { hide } from "@/store/showAuth";

const GoogleAuthWrapper = () => {
  const dispatch = useDispatch();
  const showAuth = useSelector((state) => state.showAuth.showAuth);
  return (
    <div
      onClick={() => dispatch(hide())}
      className={`${
        showAuth ? "flex " : "hidden"
      } fixed top-0 left-0 z-[999] backdrop-blur-md w-screen bg-transparent h-screen items-center justify-center`}
    >
      <div className="bg-white p-5 rounded-lg">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            dispatch(createOrGetUser(credentialResponse));
            dispatch(hide());
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
};

export default GoogleAuthWrapper;
