const GeoLocation = (setLocation) => {
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

export default GeoLocation;
