import { View, Text, Button } from "react-native";

import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import React, { useState, useRef, useEffect } from "react";

import { useDarkMode } from "../../components/context/DarkModeContext";
import {
  GooglePlacesAutocomplete,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../../services/GoogleApiKey";
import { StyleSheet } from "react-native";
import MapViewDirections from "react-native-maps-directions";

import { TouchableOpacity, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import io from "socket.io-client";
import { Modal } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { PROVIDER_GOOGLE } from "react-native-maps";
import SidebarMenu from "../SidebarMenu";
import { IconButton } from "react-native-elements";

// import { Platform } from "react-native";
// import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
const socket = io("wss://websocket-server-hopspot.glitch.me/");

const edgePaddingValue = 70;

const edgePadding = {
  top: edgePaddingValue,
  right: edgePaddingValue,
  bottom: edgePaddingValue,
  left: edgePaddingValue,
};
const InputAutocomplete = ({ label, placeholder, onPlaceSelected }) => {
  return (
    <View>
      <Text>{label}</Text>
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        fetchDetails={true}
        placeholder={placeholder}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
          onPlaceSelected(details);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: "en",
        }}
        onNotFound={() => console.log("no results")}
        onFail={(error) => console.log(error)}
      />
    </View>
  );
};

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
const GooglePlacesInput = () => {
  const [location, setLocation] = useState(null);
  const [locationUpdates, setLocationUpdates] = useState([]);
  const [userAddress, setUserAddress] = useState("");
  const [selectedLayer, setSelectedLayer] = useState("Terrain");
  const [searchContainerVisible, setSearchContainerVisible] = useState(false);

  const [layerMenuVisible, setLayerMenuVisible] = useState(false);
  const { darkMode } = useDarkMode();
  const insets = useSafeAreaInsets();
  const [origin, setOrigin] = useState(null); // Use null instead of an empty string
  const [destination, setDestination] = useState(null); // Use null instead of an empty string
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const mapRef = useRef(null);
  const traceRouteOnReady = (args) => {
    if (args) {
      // args.distance
      // args.duration
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };
  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    }
  };
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
  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const onPlaceSelected = (details, flag) => {
    const set = flag === "origin" ? setOrigin : setDestination;

    // Check if details object exists and has the expected structure
    if (details && details.geometry && details.geometry.location) {
      const { lat, lng } = details.geometry.location;

      const position = {
        latitude: lat,
        longitude: lng,
      };

      set(position);
      moveTo(position);
    } else {
      console.warn("Invalid details object:", details);
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

  const handleSearchButtonPress = () => {
    // Toggle the search container visibility
    setSearchContainerRouteVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebarContainer}>
        <SidebarMenu />
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
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
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />}
        {showDirections && origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeColor="green"
            strokeWidth={4}
            onReady={traceRouteOnReady}
          />
        )}
      </MapView>

      {searchContainerVisible && (
        <View
          style={{
            position: "absolute",
            width: "90%",
            top: Math.max(insets.top, 40),
            zIndex: 10,
            marginLeft: Math.max(insets.left, 38),
            // marginLeft: Constants.statusBarHeight,
          }}
        >
          {searchContainerVisible && (
            <View style={styles.searchContainer}>
              {/* Components for Origin, Destination, and Route */}
              <View>
                <InputAutocomplete
                  label="Origin"
                  placeholder={"Enter origin"}
                  onPlaceSelected={(details) =>
                    onPlaceSelected(details, "origin")
                  }
                />
                <InputAutocomplete
                  label="Destination"
                  placeholder={"Enter destination"}
                  onPlaceSelected={(details) =>
                    onPlaceSelected(details, "destination")
                  }
                />
                <TouchableOpacity
                  style={styles.routeButton}
                  onPress={() => setShowDirections(!showDirections)}
                >
                  <Text style={styles.buttonText}>Trace route</Text>
                </TouchableOpacity>
                <View>
                  <Text>Distance: {distance.toFixed(2)} km</Text>
                  <Text>Duration: {Math.ceil(duration)} min </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      )}

      {/* Button Container */}
      <View style={styles.buttonContainer}>
        {/* Button to Toggle Search Container */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSearchButtonPress}
          activeOpacity={0.1}
        >
          <MaterialCommunityIcons
            name={searchContainerVisible ? "account" : "account-outline"}
            color="white"
            size={30}
          />
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sidebarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5, // Set a higher zIndex for the sidebar
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    zIndex: 2,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
  container: {
    flex: 1,
  },
  button: {
    width: 50,
    backgroundColor: "green",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
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
    zIndex: 3,
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
    zIndex: 4,
  },
  routeButton: {
    backgroundColor: "green",
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
  },
});

export default GooglePlacesInput;