import { View, Text } from "react-native";
import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import TextField, { Button } from "react-native-paper";
import TextInput from "react-native-paper";
const SecureStore = () => {
  const [task, setTask] = useState("");

  const handleStoreData = async () => {
    if (task === "") {
      alert("plrase type in tasks");
      return null;
    }
    SecureStore.setItemAsync("task", task);
  };

  const handleGetData = async () => {
    return SecureStore.getItemAsync("task");
  };
  const oldTasks = SecureStore.getItemAsync("tasks");
  return (
    <View>
      <TextInput onChangeText={setTask} />
      <Button />
      {/* <TextField placeholder="type task" label="task" on /> */}
    </View>
  );
};

export default SecureStore;
