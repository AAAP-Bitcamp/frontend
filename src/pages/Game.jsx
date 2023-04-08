import React from "react";
import { useState, useRef } from "react";

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
    useTimeout,
} from "@chakra-ui/react";

function PlacementExample() {
    return <></>;
}

function Timer() {
    const timeLeftRef = useRef(59.5);
    const [timerState, setTimerState] = useState(1);
    const [timerStarted, setTimerStarted] = useState(false);

    if (timerStarted) {
        console.log("eh");
        return;
    }
    setTimerStarted(true);

    setTimeout(
        () => {
            setTimerState(1 - timerState);
            if (timerState == 1) {
                timeLeftRef.current -= 0.5;
            }

            console.log(timeLeftRef.current);
        },
        500,
        timeLeftRef.current > 0
    );

    return (
        <Text fontSize="xl" id="epictext">
            {timeLeftRef.current > 0
                ? `${timeLeftRef.current} seconds left`
                : "Time's up!"}
        </Text>
    );
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
    setModalText,
    openModal,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [placement, setPlacement] = React.useState("left");
    const [previewUrl, setPreviewUrl] = useState("");
    const submitThing = () => {
        console.log(previewUrl);
        if (previewUrl.length == 0) {
            setModalText("Please take a photo!");
            openModal();
            return;
        }
        var newImgs = [...userImgs];
        newImgs = [previewUrl].concat(newImgs);
        addPoints(currentUser["name"]);
        setUserImgs(newImgs);
        console.log(newImgs);
        setPreviewUrl("");
    };
    return (
        <Flex direction="column">
            <Flex>
                <PlacementExample />
                <Flex overflowX="auto" direction="column">
                    <Text align="center" fontSize="4xl" mb={50}>
                        Game In Progress
                    </Text>
                    <Camera
                        imgSize={200}
                        previewUrl={previewUrl}
                        setPreviewUrl={setPreviewUrl}
                        mb={5}
                    />
                    <Button
                        mt={5}
                        mb={5}
                        colorScheme="red"
                        onClick={submitThing}
                    >
                        Assassinate!
                    </Button>
                    <Button colorScheme="blue" onClick={onOpen} mb={5}>
                        Open Scoreboard
                    </Button>

                    <Drawer
                        placement={placement}
                        onClose={onClose}
                        isOpen={isOpen}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerHeader borderBottomWidth="1px">
                                Scoreboard
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
                    <Text fontSize="2xl" align="center" mb={2}>
                        My Targets
                    </Text>
                    <Flex width="100%" justifyContent="center">
                        <Box
                            maxWidth={window.innerWidth - 110}
                            overflowX="scroll"
                        >
                            <Flex>
                                {userImgs.map((userData) => {
                                    return (
                                        <Image
                                            boxSize="200px"
                                            mr={5}
                                            borderRadius="full"
                                            src={userData}
                                            minWidth="200px"
                                        ></Image>
                                    );
                                })}
                            </Flex>
                        </Box>
                    </Flex>
                    <Timer></Timer>
                </Flex>
            </Flex>
            {/* <Divider /> */}
        </Flex>
    );
};

export default Game;
