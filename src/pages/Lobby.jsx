import React from "react";
import { Button, Input, Text, Flex, Box } from "@chakra-ui/react";
import { useState } from "react";

const Lobby = ({ currentUser, users, updatePage }) => {
    const [joinCode, setJoinCode] = useState("");

    const sendToWebsocket = () => {};

    const startGame = () => {
        // TESTING ONLY PLEASE SET BACK TO "game"
        updatePage("end");
    };

    const handleChange = (event) => {
        setJoinCode(event.target.value);
    };

    console.log("THESE ARE");
    console.log(users);

    return (
        <Flex align="center" justify="center" direction="column">
            <Text fontSize="3xl" mb={5}>
                PhotoAssassins - CODE_HERE
            </Text>

            {users.map((userData) => {
                return (
                    <Flex>
                        <Text fontSize="3xl" mb={5}>
                            {userData["name"]} {userData["isAdmin"] && "ADMIN"}
                        </Text>
                        <img
                            style={{ height: 200 }}
                            src={userData["photoData"]}
                        ></img>
                    </Flex>
                );
            })}
            {currentUser["isAdmin"] && (
                <Button onClick={startGame}>Start Game</Button>
            )}
        </Flex>
    );
};

export default Lobby;
