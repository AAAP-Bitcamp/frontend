import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Button,
    Flex,
    Text,
    Card,
    CardBody,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

const UserCard = (props) => {
    const finalizeSubmit = (namey) => {
        var newImgs = [...props.userImgs];
        if (namey == props.currentUser["name"]) {
            props.setPreviewUrl("");
            props.closeAll();
            props.setModalText("You idiot!  Don't kill yourself");
            props.openModal();
            return;
        }
        newImgs = [props.previewUrl].concat(newImgs);
        props.addPoints(props.currentUser["name"]);
        props.setUserImgs(newImgs);
        console.log(newImgs);
        props.closeAll();
        props.setModalText(
            "Good one! " + props.userData["name"] + " deserved it!"
        );
        props.openModal();
        props.setPreviewUrl("");
    };

    return (
        <Card
            onClick={() => {
                props.setTarget(props.userData["name"]);
                finalizeSubmit(props.userData["name"]);
            }}
            mb={5}
            style={{ width: "100%" }}
        >
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

const TargetSelection = ({
    onClose,
    isOpen,
    users,
    setTarget,
    userImgs,
    previewUrl,
    setUserImgs,
    currentUser,
    newImgs,
    setPreviewUrl,
    addPoints,
    setModalText,
    openModal,
}) => {
    const closeAll = () => onClose(false);

    return (
        <Modal
            colorScheme="red"
            isCentered
            onClose={closeAll}
            isOpen={isOpen}
            motionPreset="slideInBottom"
        >
            <ModalOverlay colorScheme="red" />
            <ModalContent margin={5}>
                <Flex
                    align="center"
                    justify="center"
                    direction="column"
                    padding={5}
                >
                    <Text color="red" mb={5}>
                        SELECT YOUR TARGET FROM OUR WONDERFUL OPTIONS
                    </Text>
                    {users.map((userData) => {
                        return (
                            <UserCard
                                setTarget={setTarget}
                                userData={userData}
                                users={users}
                                userImgs={userImgs}
                                previewUrl={previewUrl}
                                setUserImgs={setUserImgs}
                                setPreviewUrl={setPreviewUrl}
                                addPoints={addPoints}
                                closeAll={closeAll}
                                setModalText={setModalText}
                                openModal={openModal}
                                currentUser={currentUser}
                            />
                        );
                    })}
                </Flex>
            </ModalContent>
        </Modal>
    );
};

export default TargetSelection;
