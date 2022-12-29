import { Avatar, Flex, Icon, Input, Stack, Text } from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { shuffle } from "lodash";
import moment from "moment";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { BsFillPeopleFill } from "react-icons/bs";
import {
  MdGroupAdd,
  MdInsertEmoticon,
  MdMoreHoriz,
  MdPublic,
} from "react-icons/md";

import { firestore } from "../firebase/firebase";
import Comments from "./Comments";

const IconImage = [
  "https://i.postimg.cc/4dpPnmBh/linkedin-funny-emoticon-250.png",
  "https://i.postimg.cc/0jxfSPBX/Linkedin-Celebrate-Icon-Clapping-Hands250.png",
  "https://i.postimg.cc/1zkM9pcQ/Linkedin-Support-Icon-Heartin-Hand250.png",
];
const SecondIconImage = [
  "https://i.postimg.cc/YSGbKXFR/Linkedin-Love-Icon-Heart250.png",
  "https://i.postimg.cc/Cx6m2yRd/Linkedin-Insightful-Icon-Lamp250.png",
  "https://i.postimg.cc/4NP8zHZ6/Linkedin-Curious-Icon-Purple-Smiley250.png",
];

type HomePostProps = {
  id: any;
  caption: string;
  communityType: string;
  image: string;
  profileImage: string;
  company: string;
  timestamp: any;
  username: string;
};

const HomePost: React.FC<HomePostProps> = ({
  caption,
  communityType,
  image,
  profileImage,
  timestamp,
  username,
  company,
  id,
}) => {
  const { data: session }: any = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [textInput, setTextInput] = useState({ title: "", body: "" });
  const [commentLength, setCommentsLength] = useState();
  const [likes, setLikes] = useState<any[]>([]);
  const [hasLikes, setHasLikes] = useState(false);
  const [speed, setSpeed] = useState<number>();
  const [reactions, setReactions] = useState<any>("");
  const [secondReactions, setSecondReactions] = useState<any>("");
  const [commentLoading, setCommentsLoading] = useState(false);

  useEffect(() => {
    setSpeed(Math.floor(Math.random() * 5000));
  }, []);

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setTextInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const sendComment = async (e: any) => {
    e.preventDefault();
    setCommentsLoading(true);

    try {
      await addDoc(collection(firestore, "posts", id, "comments"), {
        comment: textInput.body,
        username: session?.user?.name,
        userImage:
          session?.user?.image ||
          `https://avatars.dicebear.com/api/avataaars/${speed}.svg`,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }

    setTextInput({ title: "", body: "" });
    setCommentsLoading(false);
  };

  useEffect(
    () =>
      onSnapshot(collection(firestore, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [firestore, id]
  );

  useEffect(
    () =>
      setHasLikes(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  useEffect(() => {
    setReactions(shuffle(IconImage).pop());
    setSecondReactions(shuffle(SecondIconImage).pop());
  }, [likes]);

  const likePost = async () => {
    try {
      if (hasLikes) {
        await deleteDoc(
          doc(firestore, "posts", id, "likes", session?.user?.uid!)
        );
      } else {
        await setDoc(
          doc(firestore, "posts", id, "likes", session?.user?.uid!),
          {
            username: session?.user?.name,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-white my-7 border rounded-sm"
      style={{ borderRadius: "10px" }}
    >
      <div className="flex items-center p-5">
        <Avatar
          name={username}
          className="rounded-full h-12 object-contain
        border p-1 mr-3 cursor-pointer"
          src={
            profileImage
              ? profileImage
              : `https://avatars.dicebear.com/api/avataaars/${speed}.svg`
          }
        />

        <Stack marginLeft="5px">
          <Text fontSize="12pt" fontWeight={600}>
            {username}
          </Text>
          <Text style={{ marginTop: "-4px" }} fontSize="9pt">
            {company}
          </Text>

          <Flex style={{ marginTop: "-4px" }}>
            <Text fontSize="10pt">
              {moment(new Date(timestamp?.seconds * 1000)).fromNow()}
            </Text>
            {communityType === "AnyOne" ? (
              <Icon
                as={MdPublic}
                style={{
                  fontSize: "15px",
                  color: "gray",
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginLeft: "10px",
                }}
              />
            ) : communityType === "Group" ? (
              <Icon
                as={MdGroupAdd}
                style={{
                  fontSize: "15px",
                  color: "gray",
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginLeft: "10px",
                }}
              />
            ) : (
              <Icon
                as={communityType === "Twitter" ? MdPublic : BsFillPeopleFill}
                style={{
                  fontSize: "15px",
                  color: "gray",
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginLeft: "10px",
                }}
              />
            )}
          </Flex>
        </Stack>
        <Flex className="flex ml-80">
          <MdMoreHoriz className=" h-5 cursor-pointer" />
        </Flex>
      </div>
      <Text
        fontSize="12pt"
        marginLeft="10px"
        marginRight="10px"
        marginBottom="10px"
      >
        {caption}
      </Text>
      {image && <img src={image} className="object-cover w-full" alt="" />}

      <div className="flex justify-end">
        {likes.length > 0 && (
          <div className="flex flex-1 justify-start items-start	 px-4 pt-4 pb-2 ">
            <img
              className="w-4 h-4"
              src="https://i.postimg.cc/tJ5zt80q/Linkedin-Like-Icon-Thumbup250.png"
              alt=""
            />
            {likes.length > 1 && (
              <img className="w-4 h-4" src={reactions} alt="" />
            )}
            {likes.length > 2 && (
              <img className="w-4 h-4" src={secondReactions} alt="" />
            )}
            <Text fontSize="11px" marginLeft="2px">
              {likes.length}
            </Text>
          </div>
        )}
        {(commentLength as any) > 0 && (
          <div className="flex justify-end items-end px-4 pt-4 pb-2">
            <Text fontSize="11px" marginLeft="2px">
              {commentLength}
            </Text>
            <Text fontSize="11px" marginLeft="3px">
              Comments .
            </Text>
            <Text fontSize="11px" marginLeft="2px">
              {faker.random.numeric()}
            </Text>
            <Text fontSize="11px" marginLeft="3px">
              Share .
            </Text>
          </div>
        )}
      </div>

      <hr />

      <div className="flex justify-between px-4 pt-4 pb-4">
        <div className="flex space-x-10 m-auto">
          {hasLikes ? (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={likePost}
              className="flex cursor-pointer hover:bg-gray-100 py-2 px-4 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="btn text-blue-500 w-6 h-6"
              >
                <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
              </svg>

              <p className="ml-2">Like</p>
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={likePost}
              className="flex cursor-pointer hover:bg-gray-100 py-2 px-4 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 btn text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
              </svg>

              <p className="ml-2">Like</p>
            </motion.div>
          )}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={
              open
                ? `flex cursor-pointer bg-gray-100 hover:bg-transparent py-2 px-4 rounded-md`
                : `flex cursor-pointer hover:bg-gray-100 py-2 px-4 rounded-md`
            }
            onClick={handleOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="btn w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>

            <p className="ml-2">Comment</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex cursor-pointer hover:bg-gray-100 py-2 px-4 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer transition-all duration-150 ease-out hover:animate-spin"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>

            <p className="ml-2">Repost</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex cursor-pointer hover:bg-gray-100 py-2 px-4 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="btn -rotate-45 w-6 h-6 text-gray-500"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>

            <p className="ml-2">send</p>
          </motion.div>
        </div>
      </div>

      {open && (
        <>
          <form className="flex items-center p-4">
            <Avatar
              size="md"
              className="rounded-full h-12 object-contain
        border p-1 mr-3 cursor-pointer"
              name={session?.user?.name!}
              src={session?.user?.image!}
            />
            <Input
              name="body"
              value={textInput.body}
              onChange={onTextChange}
              placeholder="Add a comment..."
              className="border-none flex-1 focus:ring-0 outline-none"
            />
            <MdInsertEmoticon className="mr-2 ml-1" />
            {commentLoading ? (
              <button className="font-semibold text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 animate-spin"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!textInput.body}
                onClick={sendComment}
                className="font-semibold text-blue-400"
              >
                Post
              </button>
            )}
          </form>
          <Comments id={id} setCommentsLength={setCommentsLength} />
        </>
      )}
      <div hidden>
        <Comments id={id} setCommentsLength={setCommentsLength} />
      </div>
    </motion.div>
  );
};
export default HomePost;
