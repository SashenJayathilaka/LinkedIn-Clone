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
import BarChartIcon from "@material-ui/icons/BarChart";
import DescriptionIcon from "@material-ui/icons/Description";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PhotoIcon from "@material-ui/icons/Photo";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import WorkIcon from "@material-ui/icons/Work";
import YouTubeIcon from "@material-ui/icons/YouTube";
import React, { useRef } from "react";

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
          as={PhotoIcon}
          color="gray.600"
          cursor="pointer"
          className="hover:bg-gray-300 rounded-md"
          onClick={onOpen}
        />

        <Icon
          as={YouTubeIcon}
          color="gray.600"
          cursor="pointer"
          className="hover:bg-gray-300 rounded-md"
        />

        <Icon
          as={DescriptionIcon}
          color="gray.600"
          cursor="pointer"
          className="hover:bg-gray-300 rounded-md"
        />

        <Icon
          as={WorkIcon}
          color="gray.600"
          cursor="pointer"
          className="hover:bg-gray-300 rounded-md"
        />

        <Icon
          as={SportsSoccerIcon}
          color="gray.600"
          cursor="pointer"
          className="hover:bg-gray-300 rounded-md"
        />

        <Icon
          as={BarChartIcon}
          color="gray.600"
          cursor="pointer"
          className="hover:bg-gray-300 rounded-md"
        />

        <Icon
          as={MoreHorizIcon}
          color="gray.600"
          cursor="pointer"
          className="hover:bg-gray-300 rounded-md"
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
