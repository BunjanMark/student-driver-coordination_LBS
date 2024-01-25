import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import io from "socket.io-client";
import { useDarkMode } from "../components/context/DarkModeContext";
import useStore from "../store";

const socket = io("wss://websocket-server-hopspot.glitch.me/");

const History = () => {
  const { darkMode } = useDarkMode();
  const { locationUpdates, selectedOrigin, selectedDestination } = useStore();
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    // Combine location updates and selected origin/destination into a single array
    const combinedData = [...locationUpdates];
    if (selectedOrigin) {
      combinedData.push({ origin: selectedOrigin, type: 'Selected Origin' });
    }
    if (selectedDestination) {
      combinedData.push({ destination: selectedDestination, type: 'Selected Destination' });
    }
    setSelectedData(combinedData);
  }, [locationUpdates, selectedOrigin, selectedDestination]);

  const handleLocationUpdate = async (locationUpdate) => {
    try {
      // Extract relevant details from the locationUpdate
      const { deviceNumber, distance, duration, timestamp, origin, destination } = locationUpdate;
  
      // Save the location update to history in SecureStore
      await SecureStore.setItemAsync(
        "locationHistory",
        JSON.stringify([
          ...locationUpdates,
          { deviceNumber, distance, duration, timestamp, origin, destination },
        ])
      );
  
      // Update state to reflect the new location update
      setLocationUpdates((prevUpdates) => [
        ...prevUpdates,
        { deviceNumber, distance, duration, timestamp, origin, destination },
      ]);
    } catch (error) {
      console.error("Error saving location update to history:", error);
    }
  };

  const loadLocationHistory = async () => {
  try {
    // Load location history from SecureStore using the correct key ("locationUpdates")
    const storedHistory = await SecureStore.getItemAsync("locationUpdates");
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory);
      setLocationUpdates(parsedHistory);
    }
  } catch (error) {
    console.error("Error loading location history:", error);
  }
};
  
  const renderItem = ({ item }) => { 
    const origin = item.origin ? `${item.origin.latitude}, ${item.origin.longitude}` : "N/A";
    const destination = item.destination ? `${item.destination.latitude}, ${item.destination.longitude}` : "N/A";

    return (
      <View
        style={[styles.historyItem, darkMode && styles.darkHistoryItem]}
      >
         <Text>Selected Origin: {JSON.stringify(selectedOrigin)}</Text>
         <Text>Selected Destination: {JSON.stringify(selectedDestination)}</Text>
      </View>
    );
  };


  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: darkMode
            ? "rgba(0, 0, 0, 0.7)"
            : "rgba(255, 255, 255, 0.7)",
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Image
          source={require("../images/bg.png")}
          style={styles.backgroundImage}
        />
        <Text style={[styles.maintext, darkMode && styles.darkMaintext]}>
          LOCATION HISTORY
        </Text>
        <FlatList
          data={selectedData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maintext: {
    marginTop: 70,
    margin: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  darkMaintext: {
    color: "black",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    zIndex: 0,
  },
  historyItem: {
    margin: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderRadius: 8,
  },
  darkHistoryItem: {
    backgroundColor: "gray",
  },
});

export default History;
