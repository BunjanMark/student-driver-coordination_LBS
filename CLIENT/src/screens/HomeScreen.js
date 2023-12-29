import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDarkMode } from "../components/context/DarkModeContext";
import Map from "../screentabs/Map";
import History from "../screentabs/History";
import Profile from "../screentabs/Profile";

const Tab = createMaterialBottomTabNavigator();

const HomeScreen = () => {
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
