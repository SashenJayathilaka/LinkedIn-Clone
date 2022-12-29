import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

import { BsChevronDown, BsFillPeopleFill } from "react-icons/bs";
import { MdGroupAdd, MdPublic } from "react-icons/md";

import { firestore, storage } from "../firebase/firebase";
import useSelectFile from "../hooks/useSelectFile";
import ModalFooterIcon from "./ModalFooterIcon";

type CreatePostProps = {
  isOpen: boolean;
  onClose: () => void;
  speed: any;
};

const CreatePost: React.FC<CreatePostProps> = ({ isOpen, onClose, speed }) => {
  const { data: session }: any = useSession();
  const [communityType, setCommunityType] = useState("AnyOne");
  const [hashtag, setHashtag] = useState<any>("");
  const { selectedFile, setSelectedFile, onSelectedFile } = useSelectFile();
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState({ title: "", body: "" });

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };

  const handleHashTag = () => {
    setHashtag("#");
  };

  const handleCreateCommunity = async () => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(firestore, "posts"), {
        userId: session?.user?.uid,
        username: session?.user?.name,
        caption: textInput.body,
        profileImage: session?.user?.image,
        communityType: communityType,
        company: session?.user?.email,
        timestamp: serverTimestamp() as Timestamp,
      });

      if (selectedFile) {
        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        await uploadString(imageRef, selectedFile as string, "data_url").then(
          async (snapshot) => {
            const downloadUrl = await getDownloadURL(imageRef);
            await updateDoc(doc(firestore, "posts", docRef.id), {
              image: downloadUrl,
            });
          }
        );
      } else {
        console.log("No Image");
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    textInput.body = "";
    setSelectedFile("");
    setCommunityType("AnyOne");

    onClose();
  };
  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={20}
            padding={3}
            className="text-gray-500"
          >
            Create a post
          </ModalHeader>

          <Flex className="flex flex-start m-5 gap-2">
            <Avatar
              name={session?.user?.name!}
              src={
                session?.user?.image
                  ? session?.user?.image!
                  : `https://avatars.dicebear.com/api/avataaars/${speed}.svg`
              }
            />
            <Stack>
              <Text className="font-gray-600 font-bold">
                {session?.user?.name}
              </Text>
              <Menu closeOnSelect={false}>
                <MenuButton
                  //isActive={isOpen}
                  //as={Button}

                  className="bg-transparent hover:bg-gray-200 text-gray-600 border border-gray-500  font-bold py-0.5 px-4 rounded-full text-sm -mt-2"
                >
                  {communityType === "AnyOne" ? (
                    <Icon
                      as={MdPublic}
                      style={{ fontSize: "18px", marginRight: "2px" }}
                    />
                  ) : (
                    <Icon
                      as={
                        communityType === "Twitter"
                          ? MdPublic
                          : BsFillPeopleFill
                      }
                      style={{ fontSize: "18px", marginRight: "2px" }}
                    />
                  )}
                  {communityType ? communityType : `AnyOne`}

                  <Icon
                    as={BsChevronDown}
                    style={{ fontSize: "15px", marginRight: "2px" }}
                    className="text-center ml-2 animate-bounce"
                  />
                  {/*   <BsChevronDown />*/}
                </MenuButton>
                <MenuList minWidth="400px">
                  <Stack spacing={2} className="m-5">
                    <Text>Who can see your post?</Text>
                    <hr />
                    <Checkbox
                      name="AnyOne"
                      isChecked={communityType === "AnyOne"}
                      onChange={onCommunityTypeChange}
                    >
                      <Flex align="center">
                        <Icon
                          as={MdPublic}
                          color="gray.500"
                          mr={2}
                          ml={3}
                          style={{ fontSize: "30px" }}
                        />
                        <Stack gap={0} className="m-2">
                          <Text fontSize="12pt" fontWeight={600}>
                            AnyOne
                          </Text>
                          <Text fontSize="8pt" color="gray.500">
                            Anyone can view, post and comment to this community
                          </Text>
                        </Stack>
                      </Flex>
                    </Checkbox>
                    <hr />
                    <Checkbox
                      name="Twitter"
                      isChecked={communityType === "Twitter"}
                      onChange={onCommunityTypeChange}
                    >
                      <Flex align="center">
                        <Icon
                          as={MdPublic}
                          color="gray.500"
                          mr={2}
                          ml={3}
                          style={{ fontSize: "30px" }}
                        />
                        <Stack gap={0} className="m-2">
                          <Text fontSize="12pt" fontWeight={600}>
                            AnyOne + Twitter
                          </Text>
                          <Text fontSize="8pt" color="gray.500">
                            Anyone can view, post and comment to this community
                          </Text>
                        </Stack>
                      </Flex>
                    </Checkbox>
                    <hr />
                    <Checkbox
                      name="Connection"
                      isChecked={communityType === "Connection"}
                      onChange={onCommunityTypeChange}
                    >
                      <Flex align="center">
                        <Icon
                          as={MdPublic}
                          color="gray.500"
                          mr={2}
                          ml={3}
                          style={{ fontSize: "30px" }}
                        />
                        <Stack gap={0} className="m-2">
                          <Text fontSize="12pt" fontWeight={600}>
                            Connection Only
                          </Text>
                          <Text fontSize="8pt" color="gray.500">
                            Anyone can view, post and comment to this community
                          </Text>
                        </Stack>
                      </Flex>
                    </Checkbox>
                    <hr />
                    <Checkbox
                      name="Group"
                      isChecked={communityType === "Group"}
                      onChange={onCommunityTypeChange}
                    >
                      <Flex align="center">
                        <Icon
                          as={MdGroupAdd}
                          color="gray.500"
                          mr={2}
                          ml={3}
                          style={{ fontSize: "30px" }}
                        />
                        <Stack gap={0} className="m-2">
                          <Text fontSize="12pt" fontWeight={600}>
                            Group Members
                          </Text>
                          <Text fontSize="8pt" color="gray.500">
                            Anyone can view, post and comment to this community
                          </Text>
                        </Stack>
                      </Flex>
                    </Checkbox>
                    <hr />
                  </Stack>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>

          <hr />

          <Box pl={3} pr={3}>
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Textarea
                name="body"
                fontSize="10pt"
                value={textInput.body}
                onChange={onTextChange}
                borderRadius={4}
                height="120px"
                placeholder="What Do you want to talk about?"
                _placeholder={{ color: "gray.500" }}
                _focus={{
                  outline: "none",
                  bg: "white",
                  border: "1px solid",
                  borderColor: "white",
                }}
              />
              <Text
                fontSize="9pt"
                //color={charsRemaining === 0 ? "red" : "gray.500"}
              >
                {/*{charsRemaining} Characters Remaining*/}
              </Text>
              {/*       <Text fontSize="9pt" color="red" pt={1}>
                {error}
              </Text>*/}
            </ModalBody>
            <Button colorScheme="blue" variant="ghost" onClick={handleHashTag}>
              Add hashtag
            </Button>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Flex className="flex flex-1 ">
              <ModalFooterIcon
                communityType={communityType}
                selectedFile={selectedFile}
                onSelectedImage={onSelectedFile}
                setSelectedFile={setSelectedFile}
              />
            </Flex>
            <Button
              height="30px"
              onClick={handleCreateCommunity}
              disabled={!textInput.body}
              isLoading={loading}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreatePost;
