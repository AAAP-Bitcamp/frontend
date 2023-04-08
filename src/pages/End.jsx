import React from "react";
import { Button, Input, Text, Flex, Box } from "@chakra-ui/react";
import { useState } from "react";

const End = ({ users, updatePage }) => {
    return (
        <Flex align="center" justify="center" direction="column">
            <Text fontSize="3xl" mb={5}>
                Winner
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
        </Flex>
    );
};

export default End;
