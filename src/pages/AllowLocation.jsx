import { useState } from "react";
import { Button, Text, Flex } from "@chakra-ui/react";

const LocationTracker = ({ updatePage }) => {
    const [location, setLocation] = useState(null);

    const handleLocationClick = () => {
        if (navigator.permissions) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then((result) => {
                    if (result.state === "granted") {
                        getGeolocation();
                        updatePage("takePhoto");
                    } else if (result.state === "prompt") {
                        requestLocationPermission();
                        // updatePage("takePhoto");
                    } else {
                        alert(
                            "Location permission is required to use this feature."
                        );
                    }
                });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const requestLocationPermission = () => {
        getGeolocation();
    };

    const getGeolocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                updatePage("takePhoto");
            },
            (error) => {
                alert("Location permission is required to use this feature.");
            }
        );
    };

    return (
        <>
            <Button onClick={handleLocationClick}>Get Location</Button>
            {location && (
                <Text>
                    Latitude: {location.latitude}, Longitude:{" "}
                    {location.longitude}
                </Text>
            )}
        </>
    );
};

const AllowLocation = ({ updatePage }) => {
    return (
        <Flex align="center" justify="center" direction="column">
            <Text fontSize="3xl" mb={5} align="center">
                This website requires for you to allow permission, please click
                on the button below and allow:
            </Text>
            <></>
            <LocationTracker updatePage={updatePage} mb={5}></LocationTracker>
            <Text fontSize="3xl" mb={100} align="center">
                Exit if you do not want to allow permissions!
            </Text>
        </Flex>
    );
};

export default AllowLocation;
