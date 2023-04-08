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
            <Text fontSize="3xl" mb={5}>
                PhotoAssassins
            </Text>
            <Button mb={5} onClick={createRoom}>
                Create Room
            </Button>
            <Text fontSize="3xl" mt={5} mb={5}>
                Join Room
            </Text>
            <form onSubmit={sendToWebsocket}>
                <Input
                    mb={5}
                    placeholder="Join Code"
                    value={joinCode}
                    color="white"
                    onChange={handleChange}
                ></Input>
                <Button type="submit">Enter</Button>
            </form>
        </Flex>
    );
};

export default JoinRoom;
