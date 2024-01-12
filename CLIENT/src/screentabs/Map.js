import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import SidebarMenu from "../components/SidebarMenu";
import MapView from "react-native-maps";
import GoogleMapView from "../components/GoogleMapView/GoogleMapView";
import { useDarkMode } from "../components/context/DarkModeContext";
import GooglePlacesInput from "../components/GoogleMapView/GooglePlacesInput";

const Map = () => {
  const { darkMode } = useDarkMode();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: darkMode ? "#575757" : "white" }}
    >
      <View>
        {/* <Text>
          <GooglePlacesInput />
        </Text> */}
      </View>
      <SidebarMenu />
      <GoogleMapView />
      {/* You can customize the background color or other styles based on darkMode */}

      <GooglePlacesInput />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: darkMode ? "white" : "black" }}></Text>
      </View>
    </SafeAreaView>
  );
};

export default Map;
