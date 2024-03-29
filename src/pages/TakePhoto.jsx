import { React, useState } from "react";
import imageCompression from "browser-image-compression";

import {
    Button,
    Input,
    Text,
    Flex,
    Box,
    FormControl,
    FormLabel,
    Spinner,
} from "@chakra-ui/react";
import Camera from "../components/Camera";

const TakePhoto = ({
    setCurrentUser,
    setUsers,
    updatePage,
    flex,
    setModalText,
    openModal,
}) => {
    const sendToWebsocket = () => {};
    const [previewUrl, setPreviewUrl] = useState("");

    const NameForm = () => {
        const [name, setName] = useState("");
        const [submitted, setSubmitted] = useState(false);
        const [isLoading, setIsLoading] = useState(false);

        const handleSubmit = async () => {
            if (name.length > 15) {
                setModalText("Your name is too long!");
                openModal();
                return;
            } else if (name.length < 1) {
                setModalText("Please add a name!");
                openModal();
                return;
            } else if (previewUrl.length < 1) {
                setModalText("Please take a photo!");
                openModal();
                return;
            }
            // console.error("Error submitting name:", error);

            const data = { name: name, image: previewUrl };
            fetch("https://aaap-bitcamp.onrender.com/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }).then((response) => {
                response.json().then((data) => {
                    console.log(data);
                    var newUser = {};
                    newUser["uid"] = data["id"];
                    newUser["name"] = data["name"];
                    newUser["isAdmin"] = true;
                    newUser["score"] = 0;
                    newUser["photoData"] = data["image"];
                    setCurrentUser(newUser);
                    updatePage("joinRoom");
                });
            });
        };

        return (
            <Box p={4} textAlign="center">
                {!submitted ? (
                    <form>
                        <FormControl id="name">
                            <Input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                fontSize="3xl"
                                color="white"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            mt={4}
                            colorScheme="teal"
                            fontSize="3xl"
                            onClick={handleSubmit}
                            padding={5}
                            disabled={isLoading || name === ""}
                        >
                            {isLoading ? (
                                <Box display="flex" alignItems="center">
                                    <Spinner size="sm" mr={2} />
                                    Submitting...
                                </Box>
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </form>
                ) : (
                    <Box>
                        <p>Thank you, {name}!</p>
                        <p>Your name has been submitted.</p>
                    </Box>
                )}
            </Box>
        );
    };

    return (
        <Flex align="center" justify="center" direction="column">
            <Text fontSize="5xl" mb={100} align="center">
                Welcome to PhotoAssassin
            </Text>
            <></>
            <Text fontSize="3xl" mb={5} align="center">
                Click the camera to upload your photo
            </Text>
            <Camera
                imgSize={100}
                previewUrl={previewUrl}
                setPreviewUrl={setPreviewUrl}
            />
            <NameForm></NameForm>
        </Flex>
    );
};

export default TakePhoto;
