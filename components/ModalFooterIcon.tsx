import {
  Button,
  Flex,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";

import { BsFillBarChartFill } from "react-icons/bs";
import {
  MdDescription,
  MdMoreHoriz,
  MdSportsBaseball,
  MdWork,
} from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";
import { GrYoutube } from "react-icons/gr";

type ModalFooterIconProps = {
  communityType: string;
  selectedFile?: string;
  onSelectedImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedFile: (value: string) => void;
};

const ModalFooterIcon: React.FC<ModalFooterIconProps> = ({
  communityType,
  selectedFile,
  onSelectedImage,
  setSelectedFile,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedFileRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Flex gap={2}>
        <Icon
          as={IoMdPhotos}
          color="gray.600"
          cursor="pointer"
          className="hover:bg-gray-300 rounded-md text-xl"
          onClick={onOpen}
        />

        <Icon
          as={GrYoutube}
          color="gray.600"
          cursor="pointer"
          className="hover:bg-gray-300 rounded-md text-xl"
        />

        <Icon
          as={MdDescription}
          color="gray.600"
          cursor="pointer"
          className="hover:bg-gray-300 rounded-md text-xl"
        />

        <Icon
          as={MdWork}
          color="gray.600"
          cursor="pointer"
          className="hover:bg-gray-300 rounded-md text-xl"
        />

        <Icon
          as={MdSportsBaseball}
          color="gray.600"
          cursor="pointer"
          className="hover:bg-gray-300 rounded-md text-xl"
        />

        <Icon
          as={BsFillBarChartFill}
          color="gray.600"
          cursor="pointer"
          className="hover:bg-gray-300 rounded-md text-xl"
        />

        <Icon
          as={MdMoreHoriz}
          color="gray.600"
          cursor="pointer"
          className="hover:bg-gray-300 rounded-md text-xl"
        />
        <div style={{ borderLeft: "2px solid gray", marginLeft: "20px" }}></div>
        <Button
          colorScheme="gray"
          variant="ghost"
          height="30px"
          style={{ color: "gray" }}
        >
          {communityType}
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader style={{ fontSize: "20px", color: "gray" }}>
            Edit your photo
          </ModalHeader>
          <hr />
          <ModalCloseButton />
          <ModalBody>
            <Flex
              direction="column"
              justify="center"
              align="center"
              width="100%"
            >
              {selectedFile ? (
                <>
                  <Image
                    src={selectedFile}
                    maxWidth="400px"
                    maxHeight="400px"
                  />
                  <Stack direction="row" mt={4}>
                    <Button
                      variant="outline"
                      height="28px"
                      onClick={() => setSelectedFile("")}
                    >
                      Remove
                    </Button>
                    <Button height="28px" onClick={onClose}>
                      Done
                    </Button>
                  </Stack>
                </>
              ) : (
                <>
                  <Flex
                    justify="center"
                    align="center"
                    p={20}
                    border="1px dashed"
                    borderColor="gray.200"
                    width="100%"
                    borderRadius={4}
                  >
                    <Button
                      variant="outline"
                      height="28px"
                      onClick={() => selectedFileRef.current?.click()}
                    >
                      Select images to share
                    </Button>
                    <input
                      ref={selectedFileRef}
                      type="file"
                      hidden
                      onChange={onSelectedImage}
                    />
                  </Flex>
                  <ModalFooter>
                    <Flex>
                      <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={onClose}
                        height="30px"
                        style={{
                          marginLeft: "300px",
                        }}
                      >
                        Back
                      </Button>
                    </Flex>
                  </ModalFooter>
                </>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalFooterIcon;
