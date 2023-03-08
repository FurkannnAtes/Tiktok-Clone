import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Skeletons = ({ type }) => {
  if (type === "sideBar") {
    return (
      <div className="flex flex-col gap-2 py-2">
        {[0, 1, 2, 3, 4, 5].map((skeleton, i) => (
          <div key={i} className="h-[64px] w-full flex gap-2 items-center">
            <div>
              <Skeleton count={1} className="rounded-full h-10 w-10" />
            </div>
            <div className="flex flex-col gap-1">
              <Skeleton className="w-20 h-2" count={2} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (type === "post") {
    return (
      <div className="flex flex-col gap-2 py-2 ">
        {[0, 1, 2, 3, 4, 5].map((skeleton, i) => (
          <div key={i} className=" w-full flex flex-col gap-2 ">
            <div className="flex gap-2 items-center">
              <Skeleton className="w-14 h-14 rounded-full" />
              <div className="flex flex-col gap-1">
                <Skeleton count={2} className="w-24 h-2" />
              </div>
            </div>
            <div className="flex flex-col gap-2 ml-16">
              <Skeleton count={1} className="w-24 h-2" />
              <Skeleton count={1} className="w-[336px] h-[500px] " />
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default Skeletons;
