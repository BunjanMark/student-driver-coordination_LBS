import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AboutScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../images/login.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.content}>
          <Image source={require("../images/logo.png")} style={styles.logo} />
          <Text style={styles.title}>About Us</Text>
          <Text style={styles.description}>
            Welcome to our mobile app, HopSpot! This is the about page where you
            can learn more about our application. We strive to provide
            innovative solutions to our users and create a seamless experience.
          </Text>
          <View style={styles.versionInfo}>
            <Text style={styles.versionText}>Version: 1.0.1</Text>
            <Text style={styles.versionText}>
              Release Date: January 1, 2024
            </Text>
            <Text style={styles.versionText}>Developed by: TechSolve</Text>
          </View>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  logo: {
    width: "80%",
    height: "20%",
    alignSelf: "center",
    marginBottom: 15,
    marginTop: 250,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 18,marginTop: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    position: "absolute",
  },
  versionInfo: {
    marginTop: 20,
    marginBottom: 25,
  },
  versionText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 8,
  },
});

export default AboutScreen;
