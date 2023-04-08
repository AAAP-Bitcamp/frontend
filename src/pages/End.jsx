import React from "react";
import {
    Button,
    Input,
    Text,
    CardBody,
    Card,
    Flex,
    Box,
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
} from "@chakra-ui/react";
import { useState } from "react";

const End = ({ users, updatePage }) => {
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
                                Score: {props.userData["score"]}
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

    return (
        <Flex
            width={window.innerWidth - 50}
            align="center"
            justify="center"
            direction="column"
        >
            <Text fontSize="5xl" mb={5}>
                Score Board
            </Text>

            {users.map((userData) => {
                return <UserCard userData={userData} />;
            })}

            <Button
                fontSize="4xl"
                colorScheme="teal"
                onClick={() => updatePage("takePhoto")}
            >
                Play Again
            </Button>
        </Flex>
    );
};

export default End;
