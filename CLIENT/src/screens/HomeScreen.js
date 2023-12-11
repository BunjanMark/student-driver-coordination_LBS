import React from "react";
import { useNavigation } from "@react-navigation/native";

import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AccountRecoveryScreen from "./AccountRecoveryScreen";

import Home from "../screentabs/Home";
import Notif from "../screentabs/Notif";
import Profile from "../screentabs/Profile";

const Tab = createMaterialBottomTabNavigator();

const HomeScreen = () => {
  const navigator = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="Feed"
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
        name="Time"
        component={Notif}
        options={{
          tabBarLabel: "Time",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="clock" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={Profile}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
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
