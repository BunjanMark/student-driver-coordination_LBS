import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SidebarMenu from "../components/SidebarMenu";
import MapView from "react-native-maps";
import GoogleMapView from "../components/GoogleMapView/GoogleMapView";
export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <SidebarMenu />

        <SafeAreaView>
          <GoogleMapView />
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}
