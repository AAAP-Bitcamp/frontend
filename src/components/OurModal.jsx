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
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

const OurModal = ({ isOpen, onOpen, onClose, modalText }) => {
    return (
        <Modal
            colorScheme="red"
            isCentered
            onClose={onClose}
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
                        ALERT!
                    </Text>
                    <Text color="black" mb={5}>
                        {modalText}
                    </Text>
                    <Button colorScheme="red" onClick={onClose}>
                        Dang it!
                    </Button>
                </Flex>
            </ModalContent>
        </Modal>
    );
};

export default OurModal;
