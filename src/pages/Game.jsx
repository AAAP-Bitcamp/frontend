import React from "react";
import { useState, useRef } from "react";
import TargetSelection from "../components/TargetSelection";
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
    const timeLeftRef = useRef(60);

    setTimeout(
        () => {
            timeLeftRef.current--;
        },
        500,
        timeLeftRef.current > 0
    );

    return (
        <Text fontSize="xl">
            {timeLeftRef.current > 0
                ? `${timeLeftRef.current} seconds left`
                : "Time's up!"}
        </Text>
    );
}

const getGeolocation = () => {
    // navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //         alert(position.coords.latitude + " " + position.coords.longitude);
    //     },
    //     (error) => {
    //         alert("Location permission is required to use this feature.");
    //     },
    //     { maximumAge: 0 }
    // );
};

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
    const [target, setTarget] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [targetOpen, setTargetOpen] = useState(false);
    const [placement, setPlacement] = React.useState("left");
    const [previewUrl, setPreviewUrl] = useState("");

    const submitThing = () => {
        // getGeolocation();
        console.log(previewUrl);
        if (previewUrl.length == 0) {
            setModalText("Please take a photo!");
            openModal();
            return;
        }
        setTargetOpen(true);

        return;
    };

    // const { isOpen, onOpen, onClose } = useDisclosures();
    return (
        <>
            <TargetSelection
                isOpen={targetOpen}
                onClose={setTargetOpen}
                setTarget={setTarget}
                users={users}
                userImgs={userImgs}
                previewUrl={previewUrl}
                setUserImgs={setUserImgs}
                setPreviewUrl={setPreviewUrl}
                addPoints={addPoints}
                setModalText={setModalText}
                openModal={openModal}
                currentUser={currentUser}
            />
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
                        {/* <Timer></Timer> */}
                    </Flex>
                </Flex>
                {/* <Divider /> */}
            </Flex>
        </>
    );
};

export default Game;
