import React from "react";
import { Button, Input, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";

const JoinRoom = ({ currentUser, setCurrentUser, setUsers, updatePage }) => {
    const [joinCode, setJoinCode] = useState("");

    const createRoom = () => {
        var newUser = {};
        newUser["name"] = currentUser["name"];
        newUser["isAdmin"] = true;
        newUser["score"] = 0;
        newUser["photoData"] = currentUser["photoData"];
        setCurrentUser(newUser);
        setUsers([newUser]);
        updatePage("lobby");
    };

    const sendToWebsocket = () => {
        var newUser = {};
        newUser["name"] = currentUser["name"];
        newUser["isAdmin"] = false;
        newUser["score"] = 0;
        newUser["photoData"] = currentUser["photoData"];
        setCurrentUser(newUser);
        setUsers([newUser]);
        updatePage("lobby");
    };

    const handleChange = (event) => {
        setJoinCode(event.target.value);
    };

    return (
        <Flex align="center" justify="center" direction="column">
            <Text fontSize="5xl" mb={100}>
                PhotoAssassins
            </Text>
            <Button
                mb={5}
                fontSize="4xl"
                colorScheme="teal"
                padding={10}
                onClick={createRoom}
            >
                Create Room
            </Button>
            <Text fontSize="4xl" mt={5} mb={5}>
                Join Room
            </Text>
            <form align="center" onSubmit={sendToWebsocket}>
                <Input
                    mb={5}
                    placeholder="Join Code"
                    value={joinCode}
                    color="white"
                    onChange={handleChange}
                ></Input>
                <Button colorScheme="teal" fontSize="4xl" type="submit">
                    Enter
                </Button>
            </form>
        </Flex>
    );
};

export default JoinRoom;
