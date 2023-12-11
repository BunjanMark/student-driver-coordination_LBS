import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SearchBar } from "react-native-elements";
const SidebarMenu = () => {
  state = {
    search: "",
  };

  updateSearch = (search) => {
    this.setState({ search });
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [search, setSearch] = useState("");
  return (
    <View
      style={
        (styles.container,
        { backgroundColor: "red", flexDirection: "row", gap: 150 })
      }
    >
      <TouchableOpacity onPress={toggleSidebar} style={styles.sidebarButton}>
        <Icon name="menu" size={25} color="black" />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.sidebar}>
          <TouchableOpacity style={styles.sidebarItem}>
            <Icon name="home" size={20} color="black" />
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem}>
            <Icon name="information-circle" size={20} color="black" />
            <Text>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem}>
            <Icon name="settings" size={20} color="black" />
            <Text>Settings</Text>
          </TouchableOpacity>
        </View>
      )}
      <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebarButton: {
    padding: 10,
  },
  sidebar: {
    flex: 1,
    padding: 10,
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 40,
  },
});

export default SidebarMenu;
