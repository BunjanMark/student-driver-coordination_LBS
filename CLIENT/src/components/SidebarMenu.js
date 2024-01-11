import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SearchBar } from "react-native-elements";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useDarkMode } from "../components/context/DarkModeContext";

const FixedHeader = () => {
  const { darkMode } = useDarkMode();
  const navigator = useNavigation();
  const isFocused = useIsFocused();

  const [search, setSearch] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const updateSearch = (text) => {
    setSearch(text);
  };

  const clearSearch = () => {
    setSearch("");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    if (!isFocused) {
      setSidebarOpen(false);
    }
  }, [isFocused]);


  return (
    <TouchableWithoutFeedback onPress={closeSidebar}>
      <View style={[styles.header, darkMode && styles.darkHeader]}>
        <TouchableOpacity style={styles.sidebarButton} onPress={toggleSidebar}>
          <Icon name="menu" size={25} color={darkMode ? "white" : "black"} />
        </TouchableOpacity>


        <View style={styles.searchBar}>
          <SearchBar
            placeholder="Search..."
            placeholderTextColor={darkMode ? "white" : "black"}
            onChangeText={updateSearch}
            onClear={clearSearch}
            value={search}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInputContainer}
            searchIcon={{ color: darkMode ? "white" : "black", size: 25 }}
            inputStyle={{ color: darkMode ? "white" : "black" }}
            clearIcon={{ color: darkMode ? "white" : "black" }}
          />
        </View>

        {isSidebarOpen && isFocused && (
          <View style={[styles.sidebar, darkMode && styles.darkSidebar]}>
            <TouchableOpacity
              style={styles.sidebarItem}
              onPress={() => {
                navigator.navigate("HomeScreen");
              }}
            >
              <Icon
                name="home"
                size={20}
                color={darkMode ? "black" : "white"}
              />
              <Text
                style={[styles.sidebarText, darkMode && styles.darkSidebarText]}
              >
                Home
              </Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.sidebarItem}
              onPress={() => {
                navigator.navigate("About");
              }}
            >

              <Icon
                name="information-circle"
                size={20}
                color={darkMode ? "black" : "white"}
              />
              <Text
                style={[styles.sidebarText, darkMode && styles.darkSidebarText]}
              >
                About
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sidebarItem}
              onPress={() => {
                navigator.navigate("Settings");
              }}
            >
              <Icon
                name="settings"
                size={20}
                color={darkMode ? "black" : "white"}
              />
              <Text
                style={[styles.sidebarText, darkMode && styles.darkSidebarText]}
              >
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 3,
    padding: 1,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  darkHeader: {
    backgroundColor: "#575757", // Dark mode background color
    borderColor: "#76737e", // Dark mode border color
  },
  sidebarButton: {
    padding: 15,
  },
  searchBar: {
    flex: 1,
    marginRight: 10,
  },
  searchBarContainer: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    padding: 0,
    margin: 0,
  },
  searchBarInputContainer: {
    backgroundColor: "transparent",
  },
  sidebar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 60,
    left: -5,
    padding: 5,
    zIndex: 1,
    borderBottomRightRadius: 30,
    backgroundColor: "#575757",
    width: "40%",
    height: 300,
    gap: 50,
  },
  darkSidebar: {
    backgroundColor: "#908d96", // Dark mode background color
    borderColor: "black", // Dark mode border color
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 7,
    borderColor: "transparent",
    marginLeft: -20,
  },
  sidebarText: {
    color: "white",
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  darkSidebarText: {
    color: "black", // Dark mode text color
    fontWeight: "bold",
  },
});

export default FixedHeader;
