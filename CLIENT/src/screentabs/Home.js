import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SidebarMenu from "../components/SidebarMenu";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <SidebarMenu />
        <SafeAreaView>
          <MapView style={styles.map} />
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
