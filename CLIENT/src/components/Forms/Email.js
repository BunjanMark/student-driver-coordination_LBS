import { View, Text } from "react-native";
import React from "react";
import { Button, PaperProvider, TextInput } from "react-native-paper";
import { FormStyle } from "../../Styles/FormStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { useState } from "react";

const Email = () => {
  const navigator = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const validateEmail = (input) => {
  setEmail(input);

  if (!input) {
  setError("Email is required.");
   return;
     }

     if (input.includes('@')) {
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email address.");
    }
  };

  const validatePassword = (input) => {
    setPassword(input);

    if (!input) {
      setPasswordError("Password is required.");
      return;
    }

    // Add your password validation logic here
    // For example, you can check the length or complexity
    // For simplicity, I'm using a basic check for minimum length
    if (input.length >= 6) {
      setPasswordError("");
    } else {
      setPasswordError("Password should be at least 6 characters.");
    }
  };

  return (
    <PaperProvider>
      <SafeAreaView style={FormStyle.formContainer}>
        <TextInput
          style={FormStyle.input_style}
          mode="outlined"
          label="Email"
          placeholder="Enter your email"
          onChangeText={validateEmail}
        />
        {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}

        <TextInput
          style={FormStyle.input_style}
          mode="outlined"
          label="Enter your new password"
          placeholder="Enter your new password"
          secureTextEntry
          onChangeText={validatePassword}
        />
        {passwordError ? <Text style={styles.errorMessage}>{passwordError}</Text> : null}

        <SafeAreaView>
          <Button
            mode="contained"
            style={{ width: 250 }}
            onPress={() => {
              alert("Ok!");
            }}
          >
            Reset Password
          </Button>
          <Button
            onPress={() => {
              navigator.navigate("LoginScreen");
            }}
          >
            Go back
          </Button>
        </SafeAreaView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default Email;
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "89%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
  },
  errorMessage: {
    color: "red",
  },
  validMark: {
    color: "green",
    marginLeft: 5,
    fontSize: 20,
  },
  invalidMark: {
    color: "red",
    marginLeft: 5,
    fontSize: 20,
  },
});
