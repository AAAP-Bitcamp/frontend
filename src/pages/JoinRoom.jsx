import React from "react";
import { Button, Input, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";

const JoinRoom = (props) => {
    const [joinCode, setJoinCode] = useState("");

    const sendToWebsocket = () => {};

    const handleChange = (event) => {
        setJoinCode(event.target.value);
    };

    return (
        <Flex align="center" justify="center" direction="column">
            <Text fontSize="3xl" mb={5}>
                PhotoAssassins
            </Text>
            <Button mb={5}>Create Room</Button>
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
            </form>
            <Button type="submit">Enter</Button>
        </Flex>
    );
};

export default JoinRoom;
