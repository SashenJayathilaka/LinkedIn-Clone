import { Avatar, Image } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { BsFillBookmarkStarFill } from "react-icons/bs";

type ProfileSideProps = {};

const ProfileSide: React.FC<ProfileSideProps> = () => {
  const { data: session }: any = useSession();
  const [speed, setSpeed] = useState<number>();

  useEffect(() => {
    setSpeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="hidden xl:inline-grid md:col-span-2">
      <div className="col-span-2 flex flex-col item-center px-4 md:items-start">
        {/* Top */}
        <div className="bg-white rounded-lg overflow-hidden relative flex flex-col items-center text-center border hidden:md">
          <div className="relative h-14">
            <Image src="https://rb.gy/i26zak" />
          </div>
          <Avatar
            name={session?.user?.name!}
            onClick={() => signOut()}
            src={
              session?.user?.image
                ? session?.user?.image!
                : `https://avatars.dicebear.com/api/avataaars/${speed}.svg`
            }
            className="!h-14 !w-14 !border-2 !absolute !top-4 !cursor-pointer"
          />
          <div className="mt-5 py-4 space-x-0.5">
            <h4 className="hover:underline decoration-purple-700 underline-offset-1 cursor-pointer">
              {session?.user?.name}
            </h4>
            <p className="text-black/60 text-sm">{session?.user?.email}</p>
          </div>

          <div className="hidden md:inline text-left text-gray-500 text-sm">
            <div className="font-medium sidebarButton space-y-0.5">
              <div className="flex justify-between space-x-2">
                <h4>Connection</h4>
                <span className="text-blue-500">321</span>
              </div>
              <div className="flex justify-between space-x-2">
                <h4>Views of your post</h4>
                <span className="text-blue-500">1,892</span>
              </div>
            </div>

            <div className="sidebarButton">
              <h4 className="leading-4 text-xs">
                Access exclusive tools & insights
              </h4>
              <h4 className="text-black font-medium">
                <span className="w-3 h-3 bg-gradient-to-tr from-yellow-700 to-yellow-200 inline-block rounded-sm mr-1" />
                Try Premium for free
              </h4>
            </div>

            <div className="sidebarButton flex items-center space-x-1.5">
              <BsFillBookmarkStarFill className="!-ml-1" />
              <h4 className="text-black font-medium">My items</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileSide;
