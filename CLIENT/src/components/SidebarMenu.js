import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useDarkMode } from "../components/context/DarkModeContext";

const FixedHeader = ({ username }) => {
  const { darkMode } = useDarkMode();
  const navigator = useNavigation();
  const isFocused = useIsFocused();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
      <View style={[styles.container]}>
        {isSidebarOpen && isFocused && (
          <View style={[styles.sidebar, darkMode && styles.darkSidebar]}>
            {/* Display user's name in the sidebar */}
            <Text
              style={[styles.sidebarText, darkMode && styles.darkSidebarText]}
            >
              {username}
            </Text>
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
        <TouchableOpacity
          style={[styles.sidebarButton, darkMode && styles.darkSidebarButton]}
          onPress={toggleSidebar}
        >
          <Icon name="menu" size={25} color={darkMode ? "white" : "black"} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 3,
    padding: 1,
    position: "absolute",
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
    position: "absolute",
    top: 10, // Adjust the top position as needed
    left: 10, // Adjust the left position as needed
    padding: 15,
    zIndex: 2, // Make sure the sidebar button is above the sidebar
  },
  darkSidebarButton: {
    backgroundColor: "#575757", // Dark mode background color
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
