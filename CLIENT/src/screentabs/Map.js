import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import SidebarMenu from "../components/SidebarMenu";
import MapView from "react-native-maps";
import { useDarkMode } from "../components/context/DarkModeContext";
import GooglePlacesInput from "../components/GoogleMapView/GooglePlacesInput";
import Constants from "expo-constants";
// import GooglePlacesInput from "../components/GoogleMapView/GooglePlacesInput";
import MapViewDirections from "react-native-maps-directions";
import { useState, useRef } from "react";
import GOOGLE_API_KEY from "../services/GoogleApiKey";
import {
  GooglePlacesAutocomplete,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";

// const moveTo = async (position) => {
//   const camera = await mapRef.current?.getCamera();
//   if (camera) {
//     camera.center = position;
//     mapRef.current?.animateCamera(camera, { duration: 1000 });
//   }
// };

// const edgePaddingValue = 70;

// const edgePadding = {
//   top: edgePaddingValue,
//   right: edgePaddingValue,
//   bottom: edgePaddingValue,
//   left: edgePaddingValue,
// };
// const traceRouteOnReady = (args) => {
//   if (args) {
//     // args.distance
//     // args.duration
//     setDistance(args.distance);
//     setDuration(args.duration);
//   }
// };
// const traceRoute = () => {
//   if (origin && destination) {
//     setShowDirections(true);
//     mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
//   }
// };
// const InputAutocomplete = ({ label, placeholder, onPlaceSelected }) => {
//   return (
//     <View>
//       <Text>{label}</Text>
//       <GooglePlacesAutocomplete
//         styles={{ textInput: styles.input }}
//         placeholder="Search"
//         onPress={(data, details = null) => {
//           // 'details' is provided when fetchDetails = true
//           console.log(data, details);
//         }}
//         query={{
//           key: GOOGLE_API_KEY,
//           language: "en",
//         }}
//         onNotFound={() => console.log("no results")}
//         onFail={(error) => console.log(error)}
//       />
//     </View>
//   );
// };
// const onPlaceSelected = (details, flag) => {
//   const set = flag === "origin" ? setOrigin : setDestination;
//   const position = {
//     latitude: details?.geometry.location.lat || 0,
//     longitude: details?.geometry.location.lng || 0,
//   };
//   set(position);
//   moveTo(position);
// };
const Map = () => {
  const { darkMode } = useDarkMode();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: darkMode ? "#575757" : "white",
      }}
    >
      {/* <View
        style={{
          position: "absolute",
          width: "90%",
          top: Math.max(insets.top, 40),
          zIndex: 10,
          marginLeft: Math.max(insets.left, 38),
          // marginLeft: Constants.statusBarHeight,
        }}
      > */}
      {/* <View style={styles.searchContainer}>
          <InputAutocomplete label="Origin" onPlaceSelected={() => {}} />
          <InputAutocomplete label="Destination" onPlaceSelected={() => {}} />
        </View> */}
      {/* <GooglePlacesInput /> */}
      {/* </View> */}

      <GooglePlacesInput />
      {/* <GoogleMapView /> */}
      {/* You can customize the background color or other styles based on darkMode */}
      {/* <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: darkMode ? "white" : "black" }}></Text>
      </View> */}
    </View>
  );
};

export default Map;
