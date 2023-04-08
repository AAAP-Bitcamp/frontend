import React from "react";
import {
    Button,
    Input,
    Text,
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
    return (
        <Flex align="center" justify="center" direction="column">
            <Text fontSize="5xl" mb={5}>
                Winner
            </Text>

            <OrderedList>
                {users.map((userData) => {
                    return (
                        <ListItem>
                            <Text fontSize="3xl">
                                {userData["name"]} - {userData["score"]}
                            </Text>
                            <img src={userData["photoData"]}></img>
                        </ListItem>
                    );
                })}
            </OrderedList>
        </Flex>
    );
};

export default End;
