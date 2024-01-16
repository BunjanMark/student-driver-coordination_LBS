import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import SidebarMenu from "../components/SidebarMenu";
import io from "socket.io-client";
import { useDarkMode } from "../components/context/DarkModeContext";
import { Feather } from "@expo/vector-icons"; 

const socket = io("wss://websocket-server-hopspot.glitch.me/");

const History = () => {
  const { darkMode } = useDarkMode();
  const [locationUpdates, setLocationUpdates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    loadLocationHistory();

    // Listen for location updates from the server
    socket.on("locationUpdate", (data) => {
      console.log("Location update received:", data);
      // Handle the location update and save it to history
      handleLocationUpdate(data);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("locationUpdate");
    };
  }, []);

  const handleLocationUpdate = async (locationUpdate) => {
    try {
      // Save the location update to history in SecureStore
      await SecureStore.setItemAsync(
        "locationHistory",
        JSON.stringify([...locationUpdates, locationUpdate])
      );

      // Update state to reflect the new location update
      setLocationUpdates((prevUpdates) => [...prevUpdates, locationUpdate]);
    } catch (error) {
      console.error("Error saving location update to history:", error);
    }
  };

  const loadLocationHistory = async () => {
    try {
      // Load location history from SecureStore
      const storedHistory = await SecureStore.getItemAsync("locationHistory");
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
    const locationString = JSON.stringify(item.location);
    const searchLower = searchQuery.toLowerCase();
    return (
      deviceNumber.includes(searchLower) || locationString.includes(searchLower)
    );
  });

  const handleSearch = () => {
    const results = locationUpdates.filter((result) =>
      result.address && result.address.toLowerCase().includes(searchText.toLowerCase())
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
          <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
            <Feather name="search" size={24} color={darkMode ? "white" : "black"} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredLocationUpdates}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const locationString = JSON.stringify(item.location);
            const address = item.address || "Address not available";
            return (
              <View
                style={[styles.historyItem, darkMode && styles.darkHistoryItem]}
              >
                <Text style={{ color: darkMode ? "white" : "black" }}>
                  Device {item.deviceNumber}: {locationString}
                </Text>
                <Text style={{ color: darkMode ? "white" : "black" }}>
                  Address: {address}
                </Text>
              </View>
            );
          }}
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
    marginTop: 50,
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
});

export default History;
