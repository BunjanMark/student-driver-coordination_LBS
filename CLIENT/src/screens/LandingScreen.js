import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Forms/Header";
import { FormStyle } from "../Styles/FormStyle";
import { Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const LandingScreen = () => {
  const navigator = useNavigation();
  return (
    <SafeAreaView style={FormStyle.formContainer}>
      <Header />
      <Text variant="headlineMedium" style={{ marginTop: 40 }}>
        Welcome to NIKE
      </Text>
      <SafeAreaView style={{ flexDirection: "row", gap: 40 }}>
        <Button
          mode="contained-tonal"
          icon={"login"}
          onPress={() => {
            navigator.navigate("LoginScreen");
          }}
        >
          Log in
        </Button>
        <Button
          icon={"account-plus"}
          mode="contained"
          onPress={() => {
            navigator.navigate("RegisterScreen");
          }}
        >
          Register
        </Button>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default LandingScreen;
