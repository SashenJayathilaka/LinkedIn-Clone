import { Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdOutlineExplore, MdWork } from "react-icons/md";

import HeaderLink from "./HeaderLink";

const Container = () => {
  return (
    <div className="space-y-10 relative">
      <header className="flex justify-around items-center py-4">
        <div className="relative w-36 h-10 -top-5">
          <Image src="https://www.veloceinternational.com/wp-content/uploads/2022/04/Linkedin-Logo.png" />
        </div>
        <div className="flex items-center sm:divide-x divide-gray-300">
          <div className="hidden sm:flex space-x-8 pr-4">
            <HeaderLink Icon={MdOutlineExplore} text="Discover" />
            <HeaderLink Icon={BsFillPeopleFill} text="People" />
            <HeaderLink Icon={AiOutlineVideoCameraAdd} text="Learning" />
            <HeaderLink Icon={MdWork} text="Jobs" />
            <span className="hidden lg:inline-flex h-0.5 w-[calc(100%+20px)] bg-black dark:bg-white rounded-t-full" />
          </div>

          <div>
            <div className="pl-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-blue-700 font-semibold rounded-full border border-blue-700 px-5 py-1.5 transition-all flex justify-between gap-4 items-center hover:bg-gray-900 hover:text-white shadow-md"
                onClick={() =>
                  signIn("google", {
                    callbackUrl:
                      process.env.NEXTAUTH_URL || "http://localhost:3000",
                  })
                }
              >
                <Image src="./googlelogo.png" className="w-4 h-4" />
                Sign in with Google
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-col xl:flex-row items-center max-w-screen-lg mx-auto">
        <div className="space-y-6 xl:space-y-10">
          <h1 className="text-3xl md:text-5xl text-amber-800/80 max-w-xl !leading-snug pl-4 xl:pl-0">
            Welcome to your professional community
          </h1>
          <div className="space-y-4">
            <div className="intent">
              <h2 className="text-xl">Search for a job</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
            <div className="intent">
              <h2 className="text-xl">Find a person you know</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
            <div className="intent">
              <h2 className="text-xl">Learn a new skill</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="relative xl:absolute w-80 h-80 xl:w-[650px] xl:h-[650px] top-14 right-5 mt-5">
          <Image src="./dxf91zhqd2z6b0bwg85ktm5s4.svg" className="z-0" />
        </div>
      </main>
    </div>
  );
};
export default Container;
