import { Image } from "@chakra-ui/react";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExploreIcon from "@material-ui/icons/Explore";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import PeopleIcon from "@material-ui/icons/People";
import WorkIcon from "@material-ui/icons/Work";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import HeaderLink from "./HeaderLink";

type ContainerProps = {};

const Container: React.FC<ContainerProps> = () => {
  const router = useRouter();
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
    router.push(`/l/home`);
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  return (
    <div className="space-y-10 relative">
      <header className="flex justify-around items-center py-4">
        <div className="relative w-36 h-10 -top-5">
          <Image src="https://www.veloceinternational.com/wp-content/uploads/2022/04/Linkedin-Logo.png" />
        </div>
        <div className="flex items-center sm:divide-x divide-gray-300">
          <div className="hidden sm:flex space-x-8 pr-4">
            <HeaderLink Icon={ExploreIcon} text="Discover" />
            <HeaderLink Icon={PeopleIcon} text="People" />
            <HeaderLink Icon={OndemandVideoIcon} text="Learning" />
            <HeaderLink Icon={WorkIcon} text="Jobs" />
            <span className="hidden lg:inline-flex h-0.5 w-[calc(100%+20px)] bg-black dark:bg-white rounded-t-full" />
          </div>

          <div>
            <div className="pl-4">
              <button
                className="text-blue-700 font-semibold rounded-full border border-blue-700 px-5 py-1.5 transition-all hover:border-2"
                onClick={() => signInWithGoogle()}
              >
                Sign in
              </button>
              {error && <p className="text-xs text-red-400">{error.message}</p>}
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
              <ChevronRightIcon className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Find a person you know</h2>
              <ChevronRightIcon className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Learn a new skill</h2>
              <ChevronRightIcon className="text-gray-700" />
            </div>
          </div>
        </div>

        <div className="relative xl:absolute w-80 h-80 xl:w-[650px] xl:h-[650px] top-14 right-5 mt-5">
          <Image src="./images/dxf91zhqd2z6b0bwg85ktm5s4.svg" />
        </div>
      </main>
    </div>
  );
};
export default Container;
