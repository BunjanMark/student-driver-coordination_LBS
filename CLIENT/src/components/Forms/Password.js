import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import { FormStyle } from "../../Styles/FormStyle";
import { KeyboardAvoidingView } from "react-native";
const Password = () => {
  const [TextPassword, setTextPassword] = useState("");
  const [HideEntry, setHideEntry] = useState(true);

  const toggleSecureEntry = () => {
    setHideEntry(!HideEntry);
  };

  const handleTextChange = (text) => {
    setTextPassword(text);
  };

  return (
    <SafeAreaView>
      <TextInput
        mode="outlined"
        style={FormStyle.input_style}
        label="Password"
        placeholder="Enter your password"
        value={TextPassword}
        onChangeText={handleTextChange}
        secureTextEntry={HideEntry}
        right={
          <TextInput.Icon
            onPress={toggleSecureEntry}
            icon={!HideEntry ? "eye" : "eye-off"}
          />
        }
      />
    </SafeAreaView>
  );
};

export default Password;
