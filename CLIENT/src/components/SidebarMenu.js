import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SearchBar } from "react-native-elements";

const FixedHeader = () => {
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

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.sidebarButton} onPress={toggleSidebar}>
        <Icon name="menu" size={25} color="black" />
      </TouchableOpacity>

      <View style={styles.searchBar}>
        <SearchBar
          placeholder="Search..."
          placeholderTextColor="black"
          onChangeText={updateSearch}
          onClear={clearSearch}
          value={search}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
          searchIcon={{ color: "black", size: 25 }}
          inputStyle={{ color: "black" }}
          clearIcon={{ color: "black" }}
        />
      </View>

      {isSidebarOpen && (
        <View style={styles.sidebar}>
          <TouchableOpacity style={styles.sidebarItem}>
            <Icon name="home" size={20} color="white" />
            <Text style={styles.sidebarText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem}>
            <Icon name="information-circle" size={20} color="white" />
            <Text style={styles.sidebarText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem}>
            <Icon name="settings" size={20} color="white" />
            <Text style={styles.sidebarText}>Settings</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
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
    padding: 15,
    zIndex: 1,
    borderBottomRightRadius: 20,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    width: "60%",
    height: 500,
    gap: 50,
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 7,
    borderColor: "transparent",
  },
  sidebarText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
  },
});

export default FixedHeader;
