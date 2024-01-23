import React, { useState } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Provider as PaperProvider, Text, Button } from "react-native-paper";
import Email from "../components/Forms/Email";
import { FormStyle } from "../Styles/FormStyle";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

const AccountRecoveryScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRecovery = async (email) => {
    try {
      // Perform account recovery logic here
      setIsLoading(true);

      // Simulate asynchronous operation (replace with your actual logic)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Display success message or navigate to the next screen
    } catch (error) {
      setError("Unable to recover the account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PaperProvider>
      <ImageBackground
        source={require("../images/login.png")}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={FormStyle.formContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={styles.form}
            keyboardVerticalOffset={
              Platform.OS === "ios" ? 0 : heightPercentageToDP("15%")
            }
          >
            <Image
              source={require("../images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text
              variant="headlineLarge"
              style={{
                marginTop: 320,
                fontWeight: "bold",
                fontSize: widthPercentageToDP("8%"),
              }}
            >
              ACCOUNT RECOVERY
            </Text>

            <Email />

            {error && (
              <Text style={{ color: "red", marginVertical: 10 }}>{error}</Text>
            )}
            <Button
              mode="contained"
              style={{ marginTop: 10 }}
              onPress={() => handleRecovery("user@example.com")}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                "Recover Account"
              )}
            </Button>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: heightPercentageToDP("8%"),
  },
  form: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: heightPercentageToDP("1%"),
  },
  logo: {
    width: widthPercentageToDP("25%"),
    height: heightPercentageToDP("25%"),
    position: "absolute",
    top: heightPercentageToDP("-10%"),
    left: widthPercentageToDP("-7%"),
    alignSelf: "flex-start",
  },
});

export default AccountRecoveryScreen;
