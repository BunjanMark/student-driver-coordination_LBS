import React from "react";
import { SafeAreaView, ImageBackground, StyleSheet, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const LandingScreen = () => {
  const navigator = useNavigation();

  // Assuming your current logo dimensions are 50x50
  const currentLogoWidth = 50;
  const currentLogoHeight = 50;
  const newSizeMultiplier = 2; // 10% bigger

  const newLogoWidth = currentLogoWidth * newSizeMultiplier;
  const newLogoHeight = currentLogoHeight * newSizeMultiplier;

  return (
    <ImageBackground
      source={require("../images/landing.png")}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        {/* Logo positioned at the top left corner */}
        <Image
          source={require("../images/logo.png")}
          style={{
            ...styles.logo,
            width: newLogoWidth,
            height: newLogoHeight,
          }}
          resizeMode="contain"
        />

        <Text
          variant="headlineMedium"
          style={{
            fontSize: 35,
            color: "black",
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          HotSpot
        </Text>
        <SafeAreaView style={styles.buttonContainer}>
          {/* Your other components */}
          <Button
            mode="contained"
            onPress={() => {
              navigator.navigate("LoginScreen");
            }}
            style={{ backgroundColor: "black", width: 300, height: 40 }}
            contentStyle={{
              flexDirection: "row-reverse",
              justifyContent: "center",
              alignItems: "center",
            }}
            icon={"arrow-right"}
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
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: "40%",
  },
  logo: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 40,
  },
});

export default LandingScreen;
