import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useState } from "react";

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
const OptionView1 = () => {
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);
  return (
    <View>
      <InputAutocomplete
        label="Origin"
        placeholder={"Enter origin"}
        onPlaceSelected={(details) => onPlaceSelected(details, "origin")}
      />
      <InputAutocomplete
        label="Destination"
        placeholder={"Enter destination"}
        onPlaceSelected={(details) => onPlaceSelected(details, "destination")}
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
      <OptionView1 />
    </View>
  );
};

export default OptionView1;

const styles = StyleSheet.create({
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
});
