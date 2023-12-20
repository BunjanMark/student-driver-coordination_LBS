import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, Button } from "react-native";

import * as Location from "expo-location";
import MapView from "react-native-maps";
import io from "socket.io-client";

// const socket = io("http://192.168.254.110:3000"); // Replace with your server IP

const serverAddress = "wss://websocket-server-hopspot.glitch.me";
const ws = new WebSocket(serverAddress);
const GoogleMapView = () => {
  const [location, setLocation] = useState(null);
  const [locationUpdates, setLocationUpdates] = useState([]);

  const shareLocation = async () => {
    try {
      // Get the current location
      let location = await Location.getCurrentPositionAsync({});
      console.log("Location shared:", location);

      // Emit the location data to the Socket.io server
      socket.emit("updateLocation", {
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
    } catch (error) {
      console.error("Error sharing location:", error);
    }
  };
  useEffect(() => {
    // Listen for location updates from the server
    socket.on("locationUpdate", (data) => {
      console.log("Location update received:", data);

      // Update the locationUpdates state to trigger a re-render
      setLocationUpdates((prevUpdates) => [...prevUpdates, data]);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("locationUpdate");
    };
  }, []);

  useEffect(() => {
    // Listen for location updates from the server
    socket.on("location", (data) => {
      console.log("Location received:", data);

      // Do something with the received location data, such as updating the UI.
      // For simplicity, you can just log it here.
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("location");
    };
  }, []);

  return (
    <View>
      <View style={styles.updatesContainer}>
        <Text>Location Updates:</Text>
        {locationUpdates.map((update) => (
          <Text key={update.deviceNumber}>
            Device {update.deviceNumber}: {JSON.stringify(update.location)}
          </Text>
        ))}
      </View>
      <Button title="Share Location" onPress={shareLocation} />
      <MapView
        style={styles.map}
        provider="google"
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsTraffic={true} //Tobe further develop as option
      ></MapView>
    </View>
  );
};

export default GoogleMapView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
