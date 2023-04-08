import React from "react";
import { useState } from "react";

import Camera from "@/components/Camera";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    Text,
    Flex,
    Image,
    Box,
    FormControl,
    FormLabel,
    useDisclosure,
    Spinner,
} from "@chakra-ui/react";

function PlacementExample() {
    return <></>;
}

const ScoreCard = ({ photoSrc, score }) => {
    return (
        <Box
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
        >
            <Image src={photoSrc} alt="Photo" />

            <Flex p={2} align="center">
                <Text color="black" fontSize="2xl" fontWeight="bold" flex="1">
                    Score: {score}
                </Text>
            </Flex>
        </Box>
    );
};

const Game = ({
    users,
    currentUser,
    setCurrentUser,
    setUsers,
    updatePage,
    flex = "center",
    userImgs,
    setUserImgs,
    addPoints,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [placement, setPlacement] = React.useState("left");
    const [previewUrl, setPreviewUrl] = useState(null);
    const submitThing = () => {
        console.log(previewUrl);
        var newImgs = [...userImgs];
        newImgs = newImgs.concat([previewUrl]);
        addPoints(currentUser["name"]);
        setUserImgs(newImgs);
        console.log(newImgs);
    };
    return (
        <Flex direction="column">
            <Flex>
                <PlacementExample />
                <Flex overflowX="auto">
                    <Camera setPreviewUrl={setPreviewUrl} />
                    <Button colorScheme="blue" onClick={submitThing}>
                        Submit
                    </Button>
                    <Button colorScheme="blue" onClick={onOpen}>
                        Open
                    </Button>

                    <Drawer
                        placement={placement}
                        onClose={onClose}
                        isOpen={isOpen}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerHeader borderBottomWidth="1px">
                                Basic Drawer
                            </DrawerHeader>
                            <DrawerBody>
                                {users.map((userData) => {
                                    return (
                                        <ScoreCard
                                            photoSrc={userData["photoData"]}
                                            score={userData["score"]}
                                        />
                                    );
                                })}
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </Flex>
            </Flex>
            {/* <Divider /> */}
            <Flex overflowX="auto">
                {userImgs.map((userData) => {
                    return <img style={{ height: 200 }} src={userData}></img>;
                })}
            </Flex>
        </Flex>
    );
};

export default Game;
