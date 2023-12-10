import React from "react";
import { SafeAreaView, ImageBackground, StyleSheet } from "react-native";
import Header from "../components/Forms/Header";
import { Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const LandingScreen = () => {
  const navigator = useNavigation();
  
  return (
    <ImageBackground
      source={require("../images/landing.png")}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <Header />
        <Text variant="headlineMedium" style={{ marginTop: 40, marginBottom: 20}}>
          HotSpot
        </Text>
        <SafeAreaView style={{ flexDirection: "column", gap: 40 }}>
          {/* <Button
            mode="contained-tonal"
            icon={"login"}
            onPress={() => {
              navigator.navigate("LoginScreen");
            }}
          >
            Log in
          </Button> */}
          <Button
            icon={"account-plus"}
            mode="contained"
            onPress={() => {
              navigator.navigate("RegisterScreen");
            }}
          >
            Start to Join
          </Button>
        </SafeAreaView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or "stretch"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LandingScreen;
