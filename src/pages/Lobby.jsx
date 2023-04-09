import React from "react";
import {
    Button,
    Card,
    CardBody,
    Input,
    Text,
    Flex,
    Box,
} from "@chakra-ui/react";
import { useState } from "react";

const Lobby = ({ currentUser, users, updatePage, joinCode }) => {
    const sendToWebsocket = () => {};

    const startGame = () => {
        socket.emit("start", data);
        updatePage("game");
    };

    const handleChange = (event) => {
        setJoinCode(event.target.value);
    };

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

    const UserCard = (props) => {
        return (
            <Card mb={5} style={{ width: "100%" }}>
                <CardBody padding={1}>
                    <Flex justify="space-between" style={{ width: "100%" }}>
                        <div>
                            <Text fontSize="3xl" color="black">
                                {props.userData["name"]}
                            </Text>

                            <Text fontSize="2xl" color="black">
                                {props.userData["isAdmin"] && "Admin"}
                            </Text>
                        </div>

                        <img
                            style={{ width: 100, height: 100 }}
                            src={props.userData["photoData"]}
                        ></img>
                    </Flex>
                </CardBody>
            </Card>
        );
    };

    console.log("THESE ARE");
    console.log(users);

    return (
        <Flex
            width={window.innerWidth - 50}
            align="center"
            justify="center"
            direction="column"
        >
            <Text fontSize="3xl" align="center" mb={5}>
                Room code: {joinCode["code"]}
            </Text>

            {users.map((userData) => {
                return <UserCard userData={userData} />;
            })}

            <Button fontSize="4xl" colorScheme="teal" onClick={startGame}>
                Start Game
            </Button>
        </Flex>
    );
};

export default Lobby;
