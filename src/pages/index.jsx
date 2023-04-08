import Image from "next/image";
import { Button, Input, Text, Flex } from "@chakra-ui/react";
import { SetStateAction, useState, useEffect } from "react";
import JoinRoom from "./JoinRoom";
import TakePhoto from "./TakePhoto";
import Lobby from "./Lobby";
import Game from "./Game";
import End from "./End";

export default function Home() {
    const [currPage, setCurrPage] = useState("takePhoto");
    var sampleUser = {
        name: "jUnion44",
        isAdmin: true,
        photoData: "",
        score: 0,
    };
    const [currentUser, setCurrentUser] = useState(sampleUser);
    const [users, setUsers] = useState([sampleUser]);
    const [userImgs, setUserImgs] = useState([]);

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
    console.log(users);
    if (currPage == "lobby" && users.length == 0) {
        console.log("SET");
        setUsers([sampleUser, sampleUser]);
    }

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
            {currPage == "joinRoom" && (
                <JoinRoom
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    setUsers={setUsers}
                    updatePage={setCurrPage}
                    flex="center"
                />
            )}
            {currPage == "takePhoto" && (
                <TakePhoto
                    setCurrentUser={setCurrentUser}
                    setUsers={setUsers}
                    updatePage={setCurrPage}
                    flex="center"
                />
            )}
            {currPage == "lobby" && (
                <Lobby
                    currentUser={currentUser}
                    users={users}
                    updatePage={setCurrPage}
                    flex="center"
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
        </Flex>
    );
}
