import React from "react";
import { Button, Input, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";

const TakePhoto = (props) => {
    const [joinCode, setJoinCode] = useState("");

    const sendToWebsocket = () => {};

    const handleChange = (event) => {
        setJoinCode(event.target.value);
    };

    return <Flex align="center" justify="center" direction="column"></Flex>;
};

export default TakePhoto;
