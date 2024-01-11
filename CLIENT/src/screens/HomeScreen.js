import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDarkMode } from "../components/context/DarkModeContext";
import Map from "../screentabs/Map";
import History from "../screentabs/History";

import Profile from "../screentabs/Profile";
const LayerOption = ({ onPress }) => (
  <TouchableOpacity style={styles.layerOption} onPress={onPress}>
    <MaterialCommunityIcons name="layers" color="white" size={24} />
  </TouchableOpacity>
);

const handleLayerPress = () => {
  setLayerMenuVisible(!layerMenuVisible);
};
const LayerMenu = ({ visible, onRequestClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
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
const Tab = createMaterialBottomTabNavigator();

const HomeScreen = () => {
  const [layerMenuVisible, setLayerMenuVisible] = useState(false);

  const navigator = useNavigation();
  const { darkMode } = useDarkMode();

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor={darkMode ? "green" : "green"} // Use green for active color in dark mode, blue in light mode (you can adjust this)
      barStyle={{
        backgroundColor: darkMode ? "#717171" : "white", // Use black for background in dark mode, white in light mode (you can adjust this)
      }}
    >
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="map-marker"
              color={darkMode ? "green" : color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clock"
              color={darkMode ? "green" : color}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account"
              color={darkMode ? "green" : color}
              size={26}
            />
          ),
        }}
      />
      {/* <Tab.Screen
         name="AccountRecoveryScreen"
         component={AccountRecoveryScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        /> */}
    </Tab.Navigator>
  );
};

export default HomeScreen;

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
