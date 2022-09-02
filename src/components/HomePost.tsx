import { Avatar, Stack, Icon, Flex, Text, Input } from "@chakra-ui/react";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import PeopleIcon from "@material-ui/icons/People";
import PublicIcon from "@material-ui/icons/Public";
import React, { useEffect, useState } from "react";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import moment from "moment";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import ShareIcon from "@material-ui/icons/Share";
import SendIcon from "@material-ui/icons/Send";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import Comments from "./Comments";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { faker } from "@faker-js/faker";

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
  const [error, setError] = useState(false);
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState<boolean>(false);
  const [textInput, setTextInput] = useState({ title: "", body: "" });
  const [commentLength, setCommentsLength] = useState();
  const [likes, setLikes] = useState<any[]>([]);
  const [hasLikes, setHasLikes] = useState(false);
  const [speed, setSpeed] = useState<number>();

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

    try {
      await addDoc(collection(firestore, "posts", id, "comments"), {
        comment: textInput.body,
        username: user?.displayName,
        userImage:
          user?.photoURL ||
          `https://avatars.dicebear.com/api/avataaars/${speed}.svg`,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }

    setTextInput({ title: "", body: "" });
  };

  useEffect(
    () =>
      onSnapshot(collection(firestore, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [firestore, id]
  );

  useEffect(
    () => setHasLikes(likes.findIndex((like) => like.id === user?.uid) !== -1),
    [likes]
  );

  const likePost = async () => {
    try {
      if (hasLikes) {
        await deleteDoc(doc(firestore, "posts", id, "likes", user?.uid!));
      } else {
        await setDoc(doc(firestore, "posts", id, "likes", user?.uid!), {
          username: user?.displayName,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
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
                as={PublicIcon}
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
                as={GroupAddIcon}
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
                as={communityType === "Twitter" ? PublicIcon : PeopleIcon}
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
          <MoreHorizOutlinedIcon className=" h-5 cursor-pointer" />
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

      <div className="flex">
        <div className="flex flex-1 justify-start items-start	 px-4 pt-4 pb-2 ">
          <Icon
            as={ThumbUpAltIcon}
            style={{ fontSize: "15px", color: "blue" }}
          />
          <Text fontSize="11px" marginLeft="2px">
            {likes.length}
          </Text>
        </div>
        <div className="flex justify-end items-end px-4 pt-4 pb-2 m-auto">
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
      </div>

      <hr />

      <div className="flex justify-between px-4 pt-4 pb-4">
        <div className="flex space-x-20 m-auto ">
          {hasLikes ? (
            <Flex>
              <ThumbUpAltIcon
                onClick={likePost}
                className="btn text-blue-500"
              />
              <p className="ml-2">Like</p>
            </Flex>
          ) : (
            <Flex>
              <ThumbUpAltOutlinedIcon
                onClick={likePost}
                className="btn text-gray-500"
              />
              <p className="ml-2">Like</p>
            </Flex>
          )}
          <Flex onClick={() => setOpen(true)} cursor="pointer">
            <ChatOutlinedIcon className="btn" />
            <p className="ml-2">Comment</p>
          </Flex>
          <Flex>
            <ShareIcon className="btn" />
            <p className="ml-2">Share</p>
          </Flex>
          <Flex>
            <SendIcon className="btn" />
            <p className="ml-2">send</p>
          </Flex>
        </div>
      </div>

      {open && (
        <>
          <form className="flex items-center p-4">
            <Avatar
              size="md"
              className="rounded-full h-12 object-contain
        border p-1 mr-3 cursor-pointer"
              name={user?.displayName!}
              src={user?.photoURL!}
            />
            <Input
              name="body"
              value={textInput.body}
              onChange={onTextChange}
              placeholder="Add a comment..."
              className="border-none flex-1 focus:ring-0 outline-none"
            />
            <InsertEmoticonIcon className="mr-2" />
            <button
              type="submit"
              disabled={!textInput.body}
              onClick={sendComment}
              className="font-semibold text-blue-400"
            >
              Post
            </button>
          </form>
          <Comments id={id} setCommentsLength={setCommentsLength} />
        </>
      )}
      <div hidden>
        <Comments id={id} setCommentsLength={setCommentsLength} />
      </div>
    </div>
  );
};
export default HomePost;
