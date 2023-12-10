import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { FormStyle } from "../../Styles/FormStyle";
import React from "react";

const UserName = () => {
  return (
    <View>
      <TextInput
        style={FormStyle.input_style}
        mode="outlined"
        label="Username"
      />
    </View>
  );
};

export default UserName;
