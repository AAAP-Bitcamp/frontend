import Image from "next/image";
import { Button, Input, Text, Flex, useDisclosure } from "@chakra-ui/react";
import { SetStateAction, useState, useEffect } from "react";
import JoinRoom from "./JoinRoom";
import TakePhoto from "./TakePhoto";
import Lobby from "./Lobby";
import Game from "./Game";
import End from "./End";
import OurModal from "../components/OurModal";
import AllowLocation from "./AllowLocation";
import { io } from "socket.io-client";

export default function Home() {
    const [currPage, setCurrPage] = useState("consent");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalText, setModalText] = useState("");
    var sampleUser = {
        uid: "",
        name: "jUnion44",
        isAdmin: true,
        photoData: "",
        score: 0,
    };
    const [currentUser, setCurrentUser] = useState(sampleUser);
    const [users, setUsers] = useState([sampleUser]);
    const [userImgs, setUserImgs] = useState([]);
    const [joinCode, setJoinCode] = useState({
        code: "",
        room_id: "",
        creator: "",
    });

    useEffect(() => {
        const unloadCallback = (event) => {
            event.preventDefault();
            event.returnValue = "";
            return "";
        };

        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);

    const addPoints = (userName) => {
        var chosenidx = -1;
        for (var i = 0; i < users.length; i++) {
            if (users[i]["name"] == userName) {
                chosenidx = i;
            }
        }
        if (chosenidx != -1) {
            var userClone = [...users];
            userClone[chosenidx]["score"] += 1;
            setUsers(userClone);
        }
    };

    // setUsers([sampleUser]);
    const [ws, setWs] = useState();
    console.log(currentUser);
    // if (currPage == "lobby" && users.length == 0) {
    //     console.log("SET");
    //     setUsers([sampleUser, sampleUser]);
    // }

    const sendToWebsocket = () => {};

    const handleChange = (event) => {
        setJoinCode(event.target.value);
    };

    // if (currPage == "takePhoto") {
    //     return <TakePhoto></TakePhoto>;
    // }

    const socket = io("https://aaap-bitcamp.onrender.com");
    useEffect(() => {
        // socket.on("join", (message) => {
        //     console.log(message);
        // });

        socket.on("connect", () => {
            console.log("Socket.io connection established.");
        });

        socket.on("disconnect", () => {
            console.log("Socket.io connection closed.");
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    // socket.emit("join", "You are a fucking idiot");

    return (
        <>
            <OurModal
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                modalText={modalText}
            />
            <Flex align="center" justify="center" height="100vh">
                {currPage == "joinRoom" && (
                    <JoinRoom
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}
                        setUsers={setUsers}
                        updatePage={setCurrPage}
                        flex="center"
                        joinCode={joinCode}
                        setJoinCode={setJoinCode}
                        socket={socket}
                    />
                )}
                {currPage == "takePhoto" && (
                    <TakePhoto
                        setCurrentUser={setCurrentUser}
                        setUsers={setUsers}
                        updatePage={setCurrPage}
                        flex="center"
                        setModalText={setModalText}
                        openModal={onOpen}
                    />
                )}
                {currPage == "lobby" && (
                    <Lobby
                        currentUser={currentUser}
                        users={users}
                        updatePage={setCurrPage}
                        flex="center"
                        joinCode={joinCode}
                    />
                )}
                {currPage == "game" && (
                    <Game
                        users={users}
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}
                        setUsers={setUsers}
                        updatePage={setCurrPage}
                        flex="center"
                        userImgs={userImgs}
                        setUserImgs={setUserImgs}
                        addPoints={addPoints}
                        setModalText={setModalText}
                        openModal={onOpen}
                    />
                )}
                {currPage == "end" && (
                    <End
                        users={users}
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}
                        setUsers={setUsers}
                        updatePage={setCurrPage}
                        flex="center"
                        userImgs={userImgs}
                        setUserImgs={setUserImgs}
                        addPoints={addPoints}
                    />
                )}
                {currPage == "consent" && (
                    <AllowLocation
                        users={users}
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}
                        setUsers={setUsers}
                        updatePage={setCurrPage}
                        flex="center"
                        userImgs={userImgs}
                        setUserImgs={setUserImgs}
                        addPoints={addPoints}
                    />
                )}
            </Flex>
        </>
    );
}
