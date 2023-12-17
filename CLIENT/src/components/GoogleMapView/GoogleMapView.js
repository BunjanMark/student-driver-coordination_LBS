import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";

import * as Location from "expo-location";
import MapView from "react-native-maps";

const GoogleMapView = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View>
      <MapView
        style={styles.map}
        provider="google"
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsTraffic={true} //Tobe further develop as option
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
    height: "100%",
  },
});
