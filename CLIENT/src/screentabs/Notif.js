import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import SidebarMenu from "../components/SidebarMenu";

const TransportationHistoryScreen = () => {
  const [inputKey, setInputKey] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [foundValues, setFoundValues] = useState([]);
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("transportationHistory");

      if (storedData) {
        setSavedData(storedData.split("\n"));
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
    }
  };

  const saveToTransportationHistory = async () => {
    try {
      const newDataEntry = `${inputKey}: ${inputValue}`;

      const existingData = await AsyncStorage.getItem("transportationHistory");

      const updatedData = existingData
        ? `${existingData}\n${newDataEntry}`
        : newDataEntry;

      await AsyncStorage.setItem("transportationHistory", updatedData);

      setInputKey("");
      setInputValue("");

      setSavedData(updatedData.split("\n"));
    } catch (error) {
      console.error("Error saving to transportation history:", error);
    }
  };

  const searchTransportationHistory = () => {
    const values = [];

    for (const line of savedData) {
      const [key, value] = line.split(": ");
      if (key === searchKey) {
        values.push(value);
      }
    }

    setFoundValues(values);

    if (values.length === 0) {
      Alert.alert("Not Found", `No data found for key: ${searchKey}`);
    }
  };

  return (
    <SafeAreaView>
      <SidebarMenu />
      <View>
        <Text style={styles.maintext}>SAVE INFOS</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter a key"
          value={inputKey}
          onChangeText={(text) => setInputKey(text)}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Enter a value"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />

        <TouchableOpacity
          onPress={saveToTransportationHistory}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <Text style={styles.maintext}>SEARCH HISTORY</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Search the key from saved infos"
          value={searchKey}
          onChangeText={(text) => setSearchKey(text)}
        />

        <TouchableOpacity
          onPress={searchTransportationHistory}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        <Text style={styles.maintext}>RESULTS</Text>

        <FlatList
          data={foundValues}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text>Found value: {item}</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    marginTop: 10,
    margin: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  textInput: {
    height: 55,
    borderColor: "gray",
    borderWidth: 0.5,
    padding: 10,
    margin: 4,
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#22092C",
    padding: 10,
    margin: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default TransportationHistoryScreen;
