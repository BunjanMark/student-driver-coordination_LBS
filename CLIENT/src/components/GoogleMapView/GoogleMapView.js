import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import io from "socket.io-client";
import { Modal } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { PROVIDER_GOOGLE } from "react-native-maps";
import GooglePlacesInput from "./GooglePlacesInput";
// import { Platform } from "react-native";
// import { request, PERMISSIONS, RESULTS } from "react-native-permissions";

const socket = io("wss://websocket-server-hopspot.glitch.me/");

const GoogleMapView = () => {
  const [location, setLocation] = useState(null);
  const [locationUpdates, setLocationUpdates] = useState([]);
  const [userAddress, setUserAddress] = useState("");
  const [selectedLayer, setSelectedLayer] = useState("Terrain");

  const [layerMenuVisible, setLayerMenuVisible] = useState(false);

  const shareLocation = async () => {
    try {
      // Get the current location
      let location = await Location.getCurrentPositionAsync({});
      console.log("Location shared:", location);

      // Get the address from the coordinates using the Geocoding API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyAkNA3MvoAczGTmO4gSqCbwKho1xPqRKyI`
      );

      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        // Extract the formatted address from the response
        const formattedAddress = data.results[0].formatted_address;
        console.log("Formatted Address:", formattedAddress);
        // const granted = await request(
        //   Platform.select({
        //     android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        //     ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        //   }),
        //   {
        //     title: "DemoApp",
        //     message: "DemoApp would like access to your location ",
        //   }
        // );

        // return granted === RESULTS.GRANTED;
        // Set the location and address in state
        if (Platform.OS === "ios") {
          const { status } = await Location.setAccuracyAsync(
            Location.Accuracy.Highest
          );
          if (status !== "granted") {
            Alert.alert(
              "Insufficient permissions!",
              "Sorry, we need location permissions to make this work!",
              [{ text: "Okay" }]
            );
            return;
          }
        }

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        // let { status } = await Permissions.askAsync(Permissions.LOCATION);
        // if(status === 'granted') {
        //     this.getLocation();
        //  }

        setLocation(location);
        setUserAddress(formattedAddress);

        // Emit the location data to the Socket.io server
        socket.emit("updateLocation", {
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          address: formattedAddress, // Send the formatted address to the server
        });
      } else {
        console.error("Geocoding API request failed");
      }
    } catch (error) {
      console.error("Error sharing location:", error);
    }
  };

  useEffect(() => {
    // Listen for location updates from the server
    socket.on("locationUpdate", (data) => {
      console.log("Location update received:", data);

      // Update the locationUpdates state to trigger a re-render
      setLocationUpdates((prevUpdates) => [...prevUpdates, data]);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("locationUpdate");
    };
  }, []);

  const handleLayerPress = () => {
    setLayerMenuVisible(!layerMenuVisible);
  };

  const LayerMenu = ({ visible, onRequestClose }) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.layerMenuContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.layerMenuItem}
            onPress={() => {
              setSelectedLayer("Legend 1");
              onRequestClose();
            }}
          >
            <Text>Legend 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.layerMenuItem}
            onPress={() => {
              setSelectedLayer("Legend 2");
              onRequestClose();
            }}
          >
            <Text>Legend 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.layerMenuItem}
            onPress={() => {
              setSelectedLayer("Legend 3");
              onRequestClose();
            }}
          >
            <Text>Legend 3</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        // showsUserLocation={true}
        // showsMyLocationButton={true}
        showsCompass={true}
        showsTraffic={true}
        tintColor="green"
        initialRegion={{
          latitude: 8.486097, // Local latitude
          longitude: 124.657379, // Local longitude
          latitudeDelta: 0.1522, // Zoom level
          longitudeDelta: 0.0321, // Zoom level
        }}
      >
        {locationUpdates.map((update, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: update.location.latitude,
              longitude: update.location.longitude,
            }}
            title={update.address}
          />
        ))}
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.layerOption} onPress={handleLayerPress}>
          <MaterialCommunityIcons name="layers" color="white" size={30} />
          <LayerMenu
            visible={layerMenuVisible}
            onRequestClose={handleLayerPress}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={shareLocation}
          activeOpacity={0.1}
        >
          <Icon name="map-marker" type="font-awesome" color="white" size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.layerMenuContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        ></ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "98%",
  },
  button: {
    width: 50,
    backgroundColor: "green",
    borderRadius: 20,
    padding: 10,
  },
  layerOption: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  layerMenuContainer: {
    position: "absolute",
    bottom: 240,
    left: 15,
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
  buttonContainer: {
    position: "absolute",
    right: 15,
    bottom: 90,
    flexDirection: "column",
  },
});

export default GoogleMapView;
