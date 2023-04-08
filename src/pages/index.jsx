import Image from "next/image";
import { Button, Input, Text, Flex } from "@chakra-ui/react";
import { SetStateAction, useState } from "react";
import JoinRoom from "./JoinRoom";
import TakePhoto from "./TakePhoto";

export default function Home() {
    const [currPage, setCurrPage] = useState("takePhoto");
    const [users, setUsers] = useState([]);
    const [ws, setWs] = useState();

    const [joinCode, setJoinCode] = useState("");

    const sendToWebsocket = () => {};

    const handleChange = (event) => {
        setJoinCode(event.target.value);
    };

    // if (currPage == "takePhoto") {
    //     return <TakePhoto></TakePhoto>;
    // }
    return (
        <Flex align="center" justify="center" height="100vh">
            {currPage == "joinRoom" && <JoinRoom flex="center" />}
            {currPage == "takePhoto" && <TakePhoto flex="center" />}
        </Flex>
    );
}
