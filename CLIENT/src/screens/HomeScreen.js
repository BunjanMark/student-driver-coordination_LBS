import React, { useState } from "react";
import { View, TouchableOpacity, Modal, StyleSheet, ScrollView } from "react-native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "../screentabs/Home";
import Notif from "../screentabs/Notif";
import Profile from "../screentabs/Profile";

const Tab = createMaterialBottomTabNavigator();

const LayerOption = ({ onPress }) => (
  <TouchableOpacity style={styles.layerOption} onPress={onPress}>
    <MaterialCommunityIcons name="layers" color="white" size={24} />
  </TouchableOpacity>
);

const LayerMenu = ({ visible, onRequestClose }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.layerMenuContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Terrain Option 1 */}
          <TouchableOpacity style={styles.layerMenuItem}>
            {/* Add option icon or content */}
          </TouchableOpacity>

          {/* Terrain Option 2 */}
          <TouchableOpacity style={styles.layerMenuItem}>
            {/* Add option icon or content */}
          </TouchableOpacity>

          {/* Terrain Option 3 */}
          <TouchableOpacity style={styles.layerMenuItem}>
            {/* Add option icon or content */}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const HomeScreen = () => {
  const [layerMenuVisible, setLayerMenuVisible] = useState(false);

  const handleLayerPress = () => {
    setLayerMenuVisible(!layerMenuVisible);
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="Map"
        activeColor="green"
        barStyle={{ backgroundColor: "white" }}
      >
        <Tab.Screen
          name="Map"
          component={Home}
          options={{
            tabBarLabel: "Map",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="map-marker" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={Notif}
          options={{
            tabBarLabel: "History",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="clock" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>

      {/* Layer Option */}
      <LayerOption onPress={handleLayerPress} />

      {/* Layer Menu */}
      <LayerMenu visible={layerMenuVisible} onRequestClose={handleLayerPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layerOption: {
    position: "absolute",
    bottom: 90,
    right: 20,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 20,
  },
  layerMenuContainer: {
    position: "absolute",
    bottom: 93,
    left: 215,
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 10,
    padding: 10,
  },
  layerMenuItem: {
    padding: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default HomeScreen;
