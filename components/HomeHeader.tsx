import { Image, Input } from "@chakra-ui/react";
import React from "react";

import { RiAccountCircleFill } from "react-icons/ri";
import {
  AiFillHome,
  AiOutlineUnorderedList,
  AiFillMessage,
} from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdWork } from "react-icons/md";

import HomeHeaderLink from "./HomeHeaderLink";

type HomeHeaderProps = {};

const HomeHeader: React.FC<HomeHeaderProps> = () => {
  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50 ">
      <header className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        <div className="flex justify-center m-auto">
          <Image
            src="https://play-lh.googleusercontent.com/kMofEFLjobZy_bCuaiDogzBcUT-dz3BBbOrIEjJ-hqOabjK8ieuevGe6wlTD15QzOqw"
            className="mt-2 h-8"
          />

          <Input
            className="m-2"
            placeholder="Search"
            height="35px"
            borderRadius="10px"
          />
        </div>
        <div className="flex items-center sm:divide-x divide-gray-300">
          <div className="hidden sm:flex space-x-8 pr-4">
            <HomeHeaderLink Icon={AiFillHome} text="Home" />
            <HomeHeaderLink Icon={BsFillPeopleFill} text="Network" />
            <HomeHeaderLink Icon={MdWork} text="Jobs" />
            <HomeHeaderLink Icon={AiFillMessage} text="Messaging" />
            <div className="relative">
              <HomeHeaderLink Icon={IoMdNotifications} text="Notification" />
              <div className="absolute -top-2 right-3 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-ping text-white">
                3
              </div>
            </div>
            <HomeHeaderLink Icon={RiAccountCircleFill} text="Me" />
            <span className="hidden lg:inline-flex h-0.5 w-[calc(100%+20px)] bg-black dark:bg-white rounded-t-full" />
            <HomeHeaderLink Icon={AiOutlineUnorderedList} text="Work" />
          </div>
        </div>
      </header>
    </div>
  );
};
export default HomeHeader;
