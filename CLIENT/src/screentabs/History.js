import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import io from "socket.io-client";
import { useDarkMode } from "../components/context/DarkModeContext";
import { Feather } from "@expo/vector-icons"; 
import useStore from "../store";

const socket = io("wss://websocket-server-hopspot.glitch.me/");

const History = () => {
  const { darkMode } = useDarkMode();
  const { locationUpdates, selectedOrigin, selectedDestination } = useStore();
  const [selectedData, setSelectedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  const filteredLocationUpdates = locationUpdates.filter((item) => {
    const deviceNumber = item.deviceNumber.toString();
    const originString = JSON.stringify(item.origin);
    const destinationString = JSON.stringify(item.destination);
    const searchLower = searchQuery.toLowerCase();
    return (
      deviceNumber.includes(searchLower) ||
      originString.includes(searchLower) ||
      destinationString.includes(searchLower)
    );
  });
  
  const renderItem = ({ item }) => {
    const distance = item.distance !== undefined ? item.distance.toFixed(2) : "N/A";
    const duration = item.duration !== undefined ? Math.ceil(item.duration) : "N/A"; 
    const origin = item.origin ? `${item.origin.latitude}, ${item.origin.longitude}` : "N/A";
    const destination = item.destination ? `${item.destination.latitude}, ${item.destination.longitude}` : "N/A";

    return (
      <View
        style={[styles.historyItem, darkMode && styles.darkHistoryItem]}
      >
         <Text style={{ color: darkMode ? "white" : "black" }}>
            Origin: {origin}
          </Text>
          <Text style={{ color: darkMode ? "white" : "black" }}>
            Destination: {destination}
          </Text>
          <Text style={{ color: darkMode ? "white" : "black" }}>
            Distance: {distance} km
          </Text>
          <Text style={{ color: darkMode ? "white" : "black" }}>
            Duration: {duration} min
          </Text>
          <Text style={{ color: darkMode ? "white" : "black" }}>
            Timestamp: {new Date(item.timestamp).toLocaleString()}
          </Text>
      </View>
    );
  };

  const handleSearch = () => {
    const results = locationUpdates.filter((result) =>
      result.origin && result.origin.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.destination && result.destination.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
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
        <View style={styles.searchContainer}>
          <TextInput
            style={[styles.searchInput, darkMode && styles.darkSearchInput]}
            placeholder="Search..."
            placeholderTextColor={darkMode ? "black" : "white"}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <TouchableOpacity onPress={handleSearch} style={[styles.searchIcon, darkMode && styles.darkSearchIcon]}>
            <Feather name="search" size={24} color={darkMode ? "white" : "black"} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredLocationUpdates} // or data={searchResults}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
          <Text>Selected Origin: {JSON.stringify(selectedOrigin)}</Text>
          <Text>Selected Destination: {JSON.stringify(selectedDestination)}</Text>
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
  searchInput: {
    height: 40,
    borderColor: "white",
    borderWidth: 3,
    margin: 10,
    paddingLeft: 10,
    color: "white",
  },
  darkSearchInput: {
    color: "black",
    borderColor: "black",
  },
  historyItem: {
    margin: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderRadius: 8,
  },
  darkHistoryItem: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "white",
    borderWidth: 3,
    paddingLeft: 10,
    color: "white",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  darkSearchInput: {
    color: "black",
    borderColor: "black",
  },
  searchIcon: {
    backgroundColor: "white",
    padding: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  darkSearchIcon: {
    backgroundColor: "black",
    padding: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});

export default History;
