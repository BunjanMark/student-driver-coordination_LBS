import { View, Text } from "react-native";
import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet } from "react-native";

const GoogleMapView = () => {
  return (
    <View>
      <MapView
        style={styles.map}
        provider="google"
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
      ></MapView>
    </View>
  );
};

export default GoogleMapView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "93%",
  },
});
