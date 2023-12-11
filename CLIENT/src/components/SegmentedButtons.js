import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const SegmentedButtons = () => {
  const segments = [
    { label: "Map", icon: "map" },
    { label: "Time", icon: "time" },
    { label: "Account", icon: "person" },
  ];
  const [selectedSegment, setSelectedSegment] = useState(0);

  const handleSegmentPress = (index) => {
    setSelectedSegment(index);
  };

  return (
    <View style={styles.container}>
      {segments.map((segment, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.segment,
            selectedSegment === index && styles.selectedSegment,
          ]}
          onPress={() => handleSegmentPress(index)}
        >
          <Icon name={segment.icon} size={40} color="green" />
          <Text>{segment.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
  },
  segment: {
    alignItems: "center",
  },
  selectedSegment: {
    backgroundColor: "transparent",
  },
});

export default SegmentedButtons;
