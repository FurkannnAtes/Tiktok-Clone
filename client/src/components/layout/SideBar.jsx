import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { client } from "@/utils/client";

//icons
import { AiFillHome } from "react-icons/ai";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { BsPeople } from "react-icons/bs";

const SideBar = () => {
  const [users, setUsers] = useState([]);

  const location = useLocation();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    getUsers();
  }, [user]);
  //Get Users
  const getUsers = async () => {
    try {
      const query = `*[_type == "user"]`;
      const results = await client.fetch(query);
      setUsers(results);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`${
        location.pathname === "/" ? "w-fit md:w-4/12" : "w-fit "
      } h-[90vh] flex flex-col overflow-y-auto md:pr-5 pt-5    mainSideBar border-r md:border-none`}
    >
      <div className="flex flex-col w-full">
        <Link
          className="flex gap-2 items-center justify-center md:justify-start text-mainRed text-xl py-2 hover:bg-gray-100 duration-300 w-full rounded-md px-2 font-semibold"
          to="/"
        >
          <AiFillHome /> <div className="hidden md:flex">For you</div>
        </Link>
        <Link
          className="flex gap-2 items-center text-xl py-2 justify-center md:justify-start hover:bg-gray-100 duration-300 w-full rounded-md px-2 font-semibold"
          to="/"
        >
          <BsPeople /> <div className="hidden md:flex">Following</div>
        </Link>
        <Link
          className="flex gap-2 items-center text-xl py-2 hover:bg-gray-100 duration-300 w-full rounded-md px-2 font-semibold justify-center md:justify-start"
          to="/"
        >
          <HiOutlineVideoCamera />{" "}
          <div className="hidden md:flex w-[250px]">Live Stream</div>
        </Link>
      </div>

      <div className="flex flex-col gap-2 py-2 border-t ">
        <div className="px-1 hidden md:flex">Önerilen hesaplar</div>

        {users?.map((user, i) => (
          <Link
            to={`/profile/${user.subId}`}
            key={i}
            className="flex items-center gap-2 px-1 py-2 hover:bg-gray-100 duration-200 rounded-md cursor-pointer"
          >
            <div>
              <img
                className="w-10 h-10 rounded-full"
                src={user.picture}
                alt=""
              />
            </div>
            <div className="md:flex flex-col hidden">
              <div className="text-lg font-semibold">{user.userName}</div>
              <div className="text-sm">{user.userName}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
