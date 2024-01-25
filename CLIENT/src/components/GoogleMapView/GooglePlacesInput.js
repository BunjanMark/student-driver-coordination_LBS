import { View, Text, Button, Touchable } from "react-native";
import {
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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { PROVIDER_GOOGLE } from "react-native-maps";
import SidebarMenu from "../SidebarMenu";
import useStore from "../../store";

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
        autoFillOnNotFound={true}
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

const GooglePlacesInput = () => {
  const [location, setLocation] = useState(null);
  const { locationUpdates } = useStore();
  const { setLocationUpdates, setSelectedOrigin, setSelectedDestination } = useStore();

  const [userAddress, setUserAddress] = useState("");
  const [showTrafficLayer, setShowTrafficLayer] = useState(false);
  const [layerMenuVisible, setLayerMenuVisible] = useState(false);
  const { darkMode } = useDarkMode();
  const insets = useSafeAreaInsets();
  const [origin, setOrigin] = useState(null);
  const [tracedRoutes, setTracedRoutes] = useState([]);

  const [destination, setDestination] = useState(null);
  const [originPassenger, setOriginPassenger] = useState(null);
  const [originDriver, setOriginDriver] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [showPuvDirections, setShowPuvDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSearchContainerVisible, setIsSearchContainerVisible] =
    useState(false);
  const [isSearchContainerRouteVisible, setIsSearchContainerRouteVisible] =
    useState(false);
  const [isSearchContainerPuvVisible, setIsSearchContainerPuvVisible] =
    useState(false);
  const mapRef = useRef(null);
  const [active, setActive] = useState(false);
  const [driverActive, setDriverActive] = useState(false);

  const traceRouteOnReady = (args) => {
    if (args) {
      // args.distance
      // args.duration
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };
  const traceRouteOnReadyPuv = (args) => {
    if (args) {
      // args.distance
      // args.duration
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  // For routing
  const handleButtonPressRoute = () => {
    setIsSearchContainerVisible(!isSearchContainerVisible);
    setIsSearchContainerRouteVisible(!isSearchContainerVisible);
    // Additional logic or state updates can be added here
  };

  // For PUV
  const handleButtonPressPuv = () => {
    setIsSearchContainerVisible(!isSearchContainerVisible);
    setIsSearchContainerPuvVisible(!isSearchContainerPuvVisible);
    // Additional logic or state updates can be added here
  };

  const toggleActive = (value) => {
    setActive(value);
  };

  const shareLocationPuv = async () => {
  try {
    let location = await Location.getCurrentPositionAsync({});
    console.log("Location shared:", location);
    const current_position = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    onPlaceSelectedPuv(current_position, "originPassenger");

    // Get the address from the coordinates using the Geocoding API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${GOOGLE_API_KEY}`
    );

    const data = await response.json();

    if (response.status === 200) {
      const data = await response.json();
    // Extract the formatted address from the response
      const formattedAddress = data.results[0].formatted_address;
      console.log("Formatted Address:", formattedAddress);

      setLocation(location);
      setUserAddress(formattedAddress);

      // Emit the location data to the Socket.io server
      socket.emit("updateLocation", {
        location: current_position,
        address: formattedAddress,
        origin: originPassenger,
        destination: originDriver, // assuming originDriver is set elsewhere
        distance: distance,
        duration: duration,
      });

      // Return the details object
      return {
        description: formattedAddress,
        place_id: data.results[0].place_id,
        structured_formatting: {
          main_text: formattedAddress,
          secondary_text: "",
        },
        types: ["current_location"],
        geometry: {
          location: {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          },
        },
      };
    } else {
      console.error(`Geocoding API request failed with status: ${response.status}`);
      // Log more details if needed
      return null;
    }
  } catch (error) {
    console.error("Error sharing location:", error);
    console.error("Error stack trace:", error.stack);
    return null;
  }
};

let interval;

const activateShareLocationPuv = () => {
  setActive(!active);

  if (!active) {
    interval = setInterval(shareLocationPuv, 2000);

    // Log the time when starting the interval
    console.log("Interval started at:", new Date());

    // Set up an interval to call shareLocationPuv every 2000 milliseconds (2 seconds)
    var interval = setInterval(shareLocationPuv, 2000);

    // stop the interval after a certain time (e.g., 60 seconds)
    setTimeout(() => {
      clearInterval(interval);
      toggleActive(false);
      console.log("Active state:", active);
      console.log("Interval stopped at:", new Date());
    }, 60000);
  } else {
    // Clear the interval immediately when the active is already true
    clearInterval(interval);

    console.log("Interval stopped at:", new Date());
  }
};

  // const activateGetLocationPuv = () => {
  //   setDriverActive(!driverActive);

  //   if (!driverActive) {
  //     // Log the time when starting the interval
  //     console.log("Interval started at:", new Date());

  //     // Set up an interval to call shareLocationPuv every 5000 milliseconds (5 seconds)
  //     var intervalDriver = setInterval(getDriverLocation, 5000);

  //     // stop the interval after a certain time 30secs
  //     setTimeout(() => {
  //       clearInterval(intervalDriver);
  //       toggleActive(false);
  //       console.log("DriverActive state:", driverActive);
  //       console.log("Interval stopped ats:", new Date());
  //     }, 60000);
  //   } else {
  //     // Clear the interval immediately when the active is already true
  //     clearInterval(intervalDriver);

  //     console.log("Interval stopped at:", new Date());
  //   }
  // };
  // const getDriverLocation = async () => {
  //   setActive(!setDriverActive);
  //   try {
  //     onPlaceSelectedPuv(originDriver, "destination");
  //     if (!setDriverActive === true) {
  //       // Get the current location
  //       // let location = await Location.getCurrentPositionAsync({});
  //       // console.log("Location shared:", location);
  //       // const current_position = {
  //       //   latitude: location.coords.latitude,
  //       //   longitude: location.coords.longitude,
  //       // };

  //       // setActive(!active);

  //       console.log(active);
  //       window.alert(active);
  //     }
  //   } catch (error) {
  //     console.error("Error sharing location:", error);
  //     return null;
  //   }
  // };

  const getDriverLocation = () => {
    try {
      onPlaceSelectedPuvDriver(originDriver, "originDriver");
      if (originDriver == null) {
        console.log("No data available: ", originDriver);
      }
    } catch (error) {}
  };

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 2000 });
    }
  };

  const onPlaceSelected = (details, flag) => {
    // Check if details object exists and has the expected structure
    if (details && details.geometry && details.geometry.location) {
      const { lat, lng } = details.geometry.location;
      const position = { latitude: lat, longitude: lng };

      if (flag === 'origin') {
        setSelectedOrigin(position);
      } else if (flag === 'destination') {
        setSelectedDestination(position);
      }

      // Rest of your code...
    } else {
      console.warn('Invalid details object:', details);
    }
  };

  const onPlaceSelectedPuv = (details, flag) => {
    const set =
      flag === "originPassenger" ? setOriginPassenger : setOriginDriver;

    // Check if details object exists and has the expected structure
    // if (details && details.geometry && details.geometry.location) {
    //   const { lat, lng } = details.geometry.location;

    //   const position = {
    //     latitude: lat,
    //     longitude: lng,
    //   };

    //   set(position);
    //   moveTo(position);
    // } else {
    //   console.warn("Invalid details object:", details);
    // }
    moveTo(details);
    set(details);
  };
  const onPlaceSelectedPuvDriver = (details, flag) => {
    const set = flag === "originDriver" ? setOriginDriver : setOriginPassenger;
    set(details);
  };

  useEffect(() => {
    const handleLocationUpdate = (data) => {
      setLocationUpdates([...locationUpdates, data]);
    };

    socket.on('locationUpdate', handleLocationUpdate);

    return () => {
      socket.off('locationUpdate', handleLocationUpdate);
    };
  }, [locationUpdates, setLocationUpdates]);

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

  const handleLayerPress = () => {
    setLayerMenuVisible(!layerMenuVisible);
    setShowTrafficLayer(!showTrafficLayer);
  };
  const handleSearchButtonPress = () => {
    // Toggle the search container visibility
    setSearchContainerVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <View
      style={{
        backgroundColor: darkMode ? "#575757" : "white",
      }}
    >
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
        showsTraffic={showTrafficLayer}
        tintColor="green"
        initialRegion={{
          latitude: 8.486097, // Local latitude
          longitude: 124.657379, // Local longitude
          latitudeDelta: 0.1522, // Zoom level
          longitudeDelta: 0.0321, // Zoom level
        }}
      >
        {/* {locationUpdates.map((update, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: update.location.latitude,
              longitude: update.location.longitude,
            }}
            title={update.address}
          />
        ))} */}
        {origin && (
          <Marker
            coordinate={origin}
            title="Invisible Marker"
            description="This marker is invisible"
            opacity={0} // Set opacity to 0 to make the marker invisible
          />
        )}
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

        {originPassenger && (
          <Marker
            coordinate={originPassenger}
            title="You"
            description="Current location shared"
            // opacity={0} // Set opacity to 0 to make the marker invisible
          />
        )}
        {originDriver && <Marker coordinate={originDriver} />}
        {showPuvDirections && originPassenger && originDriver && (
          <MapViewDirections
            origin={originPassenger}
            destination={originDriver}
            apikey={GOOGLE_API_KEY}
            strokeColor="green"
            strokeWidth={4}
            onReady={traceRouteOnReadyPuv}
          />
        )}
      </MapView>

      {isSearchContainerVisible && (
        <View
          style={{
            position: "absolute",
            width: "90%",
            top: Math.max(insets.top, 50),
            zIndex: 10,
            marginLeft: Math.max(insets.left, 38),
            // marginLeft: Constants.statusBarHeight,
          }}
        >
          <View style={styles.searchContainer}>
            {isSearchContainerVisible && isSearchContainerRouteVisible && (
              <View>
                <InputAutocomplete
                  label="Origin"
                  placeholder={"Enter origin"}
                  onPlaceSelected={(details) =>
                    onPlaceSelected(details, "origin")
                  }
                />
                <TouchableOpacity
                  onPress={() => {
                    setOrigin(null);
                  }}
                >
                  <Text> Remove Marker</Text>
                </TouchableOpacity>
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
            )}
            {isSearchContainerPuvVisible && isSearchContainerVisible && (
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={activateShareLocationPuv}
                  activeOpacity={0.1}
                >
                  <Icon
                    name="map-marker"
                    type="font-awesome"
                    color="white"
                    size={30}
                  />
                  <Text style={{ color: "white" }}>
                    {active ? "Stop" : "Start"} finding nearest jeep
                  </Text>
                </TouchableOpacity>

                <View>
                  <Text>Distance: {distance.toFixed(2)} km</Text>
                  <Text>Duration: {Math.ceil(duration)} min </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          // onPress={handleButtonPressRoute}
          onPress={handleButtonPressRoute}
          activeOpacity={0.1}
        >
          <MaterialCommunityIcons
            name={isSearchContainerRouteVisible ? "account" : "account-outline"}
            color="white"
            size={25}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleButtonPressPuv}
          activeOpacity={0.1}
        >
          <MaterialCommunityIcons
            name={isSearchContainerPuvVisible ? "account" : "account-outline"}
            color="white"
            size={25}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLayerPress}>
          <MaterialCommunityIcons name="train-car" color="white" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.layerMenuContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        ></ScrollView>
      </View>
    </View>
  );
};

export default GooglePlacesInput;

const styles = StyleSheet.create({
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },

  button: {
    width: "100%",
    backgroundColor: "green",
    borderRadius: 30,
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
    bottom: 70,
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
    color: "white",
  },

  customButton: {
    backgroundColor: "purple",
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 5,
  },
  sidebarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5, // Set a higher zIndex for the sidebar
  },
});
