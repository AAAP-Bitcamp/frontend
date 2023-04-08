import React from "react";
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
import { useState } from "react";
import Camera from "../components/Camera";

const TakePhoto = ({ setCurrentUser, setUsers, updatePage, flex }) => {
    const sendToWebsocket = () => {};
    const [previewUrl, setPreviewUrl] = useState(null);

    const NameForm = () => {
        const [name, setName] = useState("");
        const [submitted, setSubmitted] = useState(false);
        const [isLoading, setIsLoading] = useState(false);

        const handleSubmit = async () => {
            try {
                setIsLoading(true);
                // Call API to submit the name
                // Replace API_URL with the actual URL of your API
                await fetch(API_URL, {
                    method: "POST",
                    body: JSON.stringify({ name }),
                    headers: { "Content-Type": "application/json" },
                });
                setIsLoading(false);
                setSubmitted(true);
            } catch (error) {
                console.error("Error submitting name:", error);
                var currentUser = {
                    name: name,
                    isAdmin: false,
                    photoData: previewUrl,
                    score: 0,
                };
                setCurrentUser(currentUser);
                // setUsers([currentUser]);
                setIsLoading(false);

                // Redirect yes
                updatePage("joinRoom");
            }
        };

        return (
            <Box p={4} textAlign="center">
                {!submitted ? (
                    <form>
                        <FormControl id="name">
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            mt={4}
                            colorScheme="teal"
                            onClick={handleSubmit}
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
            <Camera setPreviewUrl={setPreviewUrl} />
            <NameForm></NameForm>
        </Flex>
    );
};

export default TakePhoto;
