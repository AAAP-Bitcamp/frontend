import React, { useRef } from "react";
import { useState } from "react";
import {
    IconButton,
    Flex,
    Image,
    FormControl,
    FormLabel,
    Icon,
    Input,
    Button,
} from "@chakra-ui/react";
import { BsCameraFill } from "react-icons/md";
// import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CameraIcon from "../../public/cameraIcon.svg";

const Camera = ({ imgSize, previewUrl, setPreviewUrl }) => {
    const fileInputRef = useRef(null);

    const handleCameraClick = () => {
        // Trigger click event on input element
        fileInputRef.current.click();
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        // setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result);
        };
        try {
            reader.readAsDataURL(file);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Flex display="flex" alignItems="center" direction="column">
            {previewUrl.length == 0 && (
                <IconButton
                    width={imgSize}
                    height={imgSize}
                    borderRadius={imgSize / 2}
                    icon={
                        <img
                            src="/cameraIcon.svg"
                            alt="Camera Icon"
                            width={imgSize / 2}
                            height={imgSize / 2}
                        />
                    }
                    aria-label="Camera"
                    onClick={handleCameraClick}
                    // mr={2}
                />
            )}
            {previewUrl.length > 0 && (
                <Image
                    onClick={handleCameraClick}
                    borderRadius="full"
                    boxSize={imgSize}
                    src={previewUrl}
                    alt="Camera Icon"
                />
            )}

            <FormControl>
                <FormLabel style={{ display: "none" }} htmlFor="fileInput">
                    Upload Image
                </FormLabel>
                <Input
                    style={{ display: "none" }}
                    onChange={handleFileInputChange}
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    ref={fileInputRef} // Set ref to the file input element
                    opacity={0} // Set opacity to 0 to hide the input element
                    position="absolute" // Set position to absolute to overlay the input element on top of the IconButton
                    zIndex="-1" // Set zIndex to -1 to position the input element below the IconButton
                />
            </FormControl>
            {/* <img src={previewUrl}></img> */}
        </Flex>
    );
};

export default Camera;
