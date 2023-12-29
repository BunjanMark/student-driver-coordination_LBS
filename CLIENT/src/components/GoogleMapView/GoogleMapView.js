import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, Button } from "react-native";

import * as Location from "expo-location";
import MapView from "react-native-maps";
import io from "socket.io-client";
import { Marker } from "react-native-maps";
// const socket = io("http://192.168.254.110:3000"); // Replace with your server IP

const socket = io("wss://websocket-server-hopspot.glitch.me/");
// const ws = new io(socket, {
//   headers: {
//     "user-agent": "Custom WS client",
//   },
// });
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
      setLocationUpdates((prevUpdates) => [
        ...prevUpdates,
        { ...data, timestamp: new Date().toLocaleTimeString() }, // Include timestamp
      ]);
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
      <Button title="Share Location" onPress={shareLocation} />
      <MapView
        style={styles.map}
        provider="google"
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsTraffic={true} //Tobe further develop as option
      >
        {locationUpdates.map((update) => (
          <Marker
            key={update.deviceNumber}
            coordinate={{
              latitude: update.location.latitude,
              longitude: update.location.longitude,
            }}
            title={`Device ${update.deviceNumber}`}
            description={`Last Update: ${update.timestamp}`}
          />
        ))}
      </MapView>
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
