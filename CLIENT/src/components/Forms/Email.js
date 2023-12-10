import { View, Text } from "react-native";
import React from "react";
import { Button, PaperProvider, TextInput } from "react-native-paper";
import { FormStyle } from "../../Styles/FormStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
// import { validator } from "validator";
import { StyleSheet } from "react-native";
// import { useState } from "react";
const Email = () => {
  const navigator = useNavigation();

  // const [email, setEmail] = useState("");

  // const [error, setError] = useState(null);

  // const validateEmail = (input) => {
  //   setEmail(input);

  //   if (!input) {
  //     setError("Email is required.");
  //     return;
  //   }

  //   if (validator.isEmail(input)) {
  //     setError("");
  //   } else {
  //     setError("Please enter a valid email address.");
  //   }
  // };

  return (
    <PaperProvider>
      <SafeAreaView style={FormStyle.formContainer}>
        <TextInput
          style={FormStyle.input_style}
          mode="outlined"
          label="Phone number"
          placeholder="Enter your mobile number"
          inputMode="numeric"
        />
        {/* <View style={styles.container}>
          <Text>Email:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={validateEmail}
              placeholder="Enter your email"
            />

            {error !== null &&
              (error ? (
                <Text style={styles.invalidMark}>✗</Text>
              ) : (
                <Text style={styles.validMark}>✓</Text>
              ))}
          </View>

          {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
        </View> */}
        <SafeAreaView>
          <Button
            mode="contained"
            style={{ width: 250 }}
            onPress={() => {
              alert("Code sent");
            }}
          >
            Send code
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
