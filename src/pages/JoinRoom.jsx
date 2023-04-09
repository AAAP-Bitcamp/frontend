import React from "react";
import { Button, Input, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";

const JoinRoom = ({
    currentUser,
    setCurrentUser,
    setUsers,
    updatePage,
    joinCode,
    setJoinCode,
    socket,
}) => {
    const [codeJoin, toCodeJoin] = useState("");

    const sendToWebsocket = (makeAdmin) => {
        const data = { user_id: currentUser["uid"], room_code: codeJoin };

        var newUser = {};
        newUser["uid"] = currentUser["uid"];
        newUser["name"] = currentUser["name"];
        newUser["isAdmin"] = false;
        newUser["score"] = 0;
        newUser["photoData"] = currentUser["photoData"];

        setCurrentUser(newUser);
        console.log("SENDING " + JSON.stringify(data));
        socket.emit("join", data);
        console.log(socket);
        socket.on("join", (response) => {
            var userArray = [];
            for (var i = 0; i < response.length; i++) {
                var curr = response[i];
                var toAdd = {};
                toAdd["uid"] = response[i]["id"];
                toAdd["name"] = response[i]["name"];
                toAdd["photoData"] = response[i]["image"];
                toAdd["score"] = 0;
                toAdd["isAdmin"] = false;
                userArray = userArray.concat([toAdd]);
            }
            console.log(response);
            setJoinCode({
                code: codeJoin,
                room_id: "",
                creator: "",
            });
            setUsers(userArray);
            updatePage("lobby");
            // Do something with the response
        });
    };

    const createRoom = () => {
        const data = { user_id: currentUser["uid"] };
        fetch("https://aaap-bitcamp.onrender.com/api/rooms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then((response) => {
            response.json().then((data) => {
                console.log(data["code"]);
                setJoinCode({
                    code: data["code"],
                    room_id: data["id"],
                    creator: data["creator"],
                });
                var newUser = {};
                newUser["uid"] = currentUser["uid"];
                newUser["name"] = currentUser["name"];
                newUser["isAdmin"] = true;
                newUser["score"] = 0;
                newUser["photoData"] = currentUser["photoData"];

                toCodeJoin(data["code"]);
                // sendToWebsocket(true);
                // sendToWebsocket(true);
            });
        });
    };

    const handleChange = (event) => {
        toCodeJoin(event.target.value);
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
            <form align="center">
                <Input
                    mb={5}
                    placeholder="Join Code"
                    value={codeJoin}
                    color="white"
                    onChange={handleChange}
                ></Input>
                <Button
                    colorScheme="teal"
                    fontSize="4xl"
                    onClick={() => {
                        sendToWebsocket(false);
                    }}
                >
                    Enter
                </Button>
            </form>
        </Flex>
    );
};

export default JoinRoom;
