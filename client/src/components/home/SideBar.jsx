import { Link } from "react-router-dom";

//icons
import { AiFillHome } from "react-icons/ai";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { BsPeople } from "react-icons/bs";

const SideBar = () => {
  return (
    <div className="h-[90vh] flex flex-col overflow-y-auto md:pr-5 pt-5   w-fit md:w-4/12 mainSideBar border-r md:border-none">
      <div className="flex flex-col w-full">
        <Link
          className="flex gap-2 items-center justify-center md:justify-start text-mainRed text-[24px] py-2 hover:bg-gray-100 duration-300 w-full rounded-md px-2 font-semibold"
          to="/"
        >
          <AiFillHome /> <div className="hidden md:flex">For you</div>
        </Link>
        <Link
          className="flex gap-2 items-center text-[24px] py-2 justify-center md:justify-start hover:bg-gray-100 duration-300 w-full rounded-md px-2 font-semibold"
          to="/"
        >
          <BsPeople /> <div className="hidden md:flex">Following</div>
        </Link>
        <Link
          className="flex gap-2 items-center text-[24px] py-2 hover:bg-gray-100 duration-300 w-full rounded-md px-2 font-semibold justify-center md:justify-start"
          to="/"
        >
          <HiOutlineVideoCamera />{" "}
          <div className="hidden md:flex">Live Stream</div>
        </Link>
      </div>
      <div className="hidden md:flex flex-col gap-5 border-y py-5 ">
        <div className="text-[#8A8B91]">
          İçerik Üreticilerini takip etmek, videoları beğenmek ve yorumları
          görüntülemek için giriş yapın.
        </div>
        <div>
          <button className="border-mainRed border py-2 w-full rounded-md text-xl font-semibold text-mainRed hover:bg-[#FFF3F5] duration-300 ">
            Sing in
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 py-2 border-t ">
        <div className="px-1 hidden md:flex">Önerilen hesaplar</div>
        <div className="flex items-center gap-2 px-1 py-2 hover:bg-gray-100 duration-200 rounded-md cursor-pointer">
          <div>
            <img
              className="w-10 h-10 rounded-full"
              src="https://i.pinimg.com/originals/3a/d6/eb/3ad6eb0c16eebeab5bafa2804dd08b19.jpg"
              alt=""
            />
          </div>
          <div className="md:flex flex-col hidden">
            <div className="text-lg font-semibold">Furkan</div>
            <div className="text-sm">FurkanAtes</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-1 py-2 hover:bg-gray-100 duration-200 rounded-md cursor-pointer">
          <div>
            <img
              className="w-10 h-10 rounded-full"
              src="https://i.pinimg.com/originals/3a/d6/eb/3ad6eb0c16eebeab5bafa2804dd08b19.jpg"
              alt=""
            />
          </div>
          <div className="md:flex flex-col hidden">
            <div className="text-lg font-semibold">Furkan</div>
            <div className="text-sm">FurkanAtes</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-1 py-2 hover:bg-gray-100 duration-200 rounded-md cursor-pointer">
          <div>
            <img
              className="w-10 h-10 rounded-full"
              src="https://i.pinimg.com/originals/3a/d6/eb/3ad6eb0c16eebeab5bafa2804dd08b19.jpg"
              alt=""
            />
          </div>
          <div className="md:flex flex-col hidden">
            <div className="text-lg font-semibold">Furkan</div>
            <div className="text-sm">FurkanAtes</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-1 py-2 hover:bg-gray-100 duration-200 rounded-md cursor-pointer">
          <div>
            <img
              className="w-10 h-10 rounded-full"
              src="https://i.pinimg.com/originals/3a/d6/eb/3ad6eb0c16eebeab5bafa2804dd08b19.jpg"
              alt=""
            />
          </div>
          <div className="md:flex flex-col hidden">
            <div className="text-lg font-semibold">Furkan</div>
            <div className="text-sm">FurkanAtes</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-1 py-2 hover:bg-gray-100 duration-200 rounded-md cursor-pointer">
          <div>
            <img
              className="w-10 h-10 rounded-full"
              src="https://i.pinimg.com/originals/3a/d6/eb/3ad6eb0c16eebeab5bafa2804dd08b19.jpg"
              alt=""
            />
          </div>
          <div className="md:flex flex-col hidden">
            <div className="text-lg font-semibold">Furkan</div>
            <div className="text-sm">FurkanAtes</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-1 py-2 hover:bg-gray-100 duration-200 rounded-md cursor-pointer">
          <div>
            <img
              className="w-10 h-10 rounded-full"
              src="https://i.pinimg.com/originals/3a/d6/eb/3ad6eb0c16eebeab5bafa2804dd08b19.jpg"
              alt=""
            />
          </div>
          <div className="md:flex flex-col hidden">
            <div className="text-lg font-semibold">Furkan</div>
            <div className="text-sm">FurkanAtes</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-1 py-2 hover:bg-gray-100 duration-200 rounded-md cursor-pointer">
          <div>
            <img
              className="w-10 h-10 rounded-full"
              src="https://i.pinimg.com/originals/3a/d6/eb/3ad6eb0c16eebeab5bafa2804dd08b19.jpg"
              alt=""
            />
          </div>
          <div className="md:flex flex-col hidden">
            <div className="text-lg font-semibold">Furkan</div>
            <div className="text-sm">FurkanAtes</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-1 py-2 hover:bg-gray-100 duration-200 rounded-md cursor-pointer">
          <div>
            <img
              className="w-10 h-10 rounded-full"
              src="https://i.pinimg.com/originals/3a/d6/eb/3ad6eb0c16eebeab5bafa2804dd08b19.jpg"
              alt=""
            />
          </div>
          <div className="md:flex flex-col hidden">
            <div className="text-lg font-semibold">Furkan</div>
            <div className="text-sm">FurkanAtes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
