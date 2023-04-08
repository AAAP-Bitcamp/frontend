import React, { useRef } from "react";
import { useState } from "react";
import {
    IconButton,
    Box,
    FormControl,
    FormLabel,
    Icon,
    Input,
} from "@chakra-ui/react";
import { BsCameraFill } from "react-icons/md";
// import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CameraIcon from "../../public/cameraIcon.svg";

const Camera = ({ setPreviewUrl }) => {
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
        reader.readAsDataURL(file);
    };

    return (
        <Box display="flex" alignItems="center">
            <IconButton
                icon={
                    <img
                        src="/cameraIcon.svg"
                        alt="Camera Icon"
                        style={{ width: 50 }}
                    />
                }
                aria-label="Camera"
                onClick={handleCameraClick}
                // mr={2}
            />
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
        </Box>
    );
};

export default Camera;
