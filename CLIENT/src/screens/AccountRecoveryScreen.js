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

import { Platform, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import Toast from "react-native-root-toast";
import fetchServices from "../services/fetchServices";

const AccountRecoveryScreen = () => {
  const navigator = useNavigation();
  const [email, setEmail] = useState("");

  const [password_confirmation, setPassword_confirmation] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [HideEntry, setHideEntry] = useState(true);

  const showToast = (message = "Something went wrong") => {
    Toast.show(message, 3000);
  };
  const toggleSecureEntry = () => {
    setHideEntry(!HideEntry);
  };
  const handleRecovery = async () => {
    try {
      // Perform account recovery logic here
      setLoading(!loading);
      if (email === "" || password === "" || password_confirmation === "") {
        showToast("Please input required data");
        setIsError(true);
        return false;
      }
      if (password !== password_confirmation) {
        showToast("Password do not match");
        setIsError(true);
        return false;
      }
      const url =
        "https://c292-2001-4455-62c-c800-478-e4fb-7367-cf00.ngrok-free.app/api/password/reset";
      // Simulate asynchronous operation (replace with your actual logic)

      const data = {
        email,
        password,
        password_confirmation,
      };

      const result = await fetchServices.postData(url, data);
      // Display success message or navigate to the next screen

      if (result.message != null) {
        showToast(result?.message);
      } else {
        navigator.navigate("LoginScreen");
      }
    } catch (e) {
      console.error(e.toString());
      showToast("An error occurred");
    } finally {
      setLoading(false);
    }
  };
  const currentLogoWidth = 50;
  const currentLogoHeight = 50;
  const newSizeMultiplier = 2;

  const newLogoWidth = currentLogoWidth * newSizeMultiplier;
  const newLogoHeight = currentLogoHeight * newSizeMultiplier;
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
                top: -20,
                fontWeight: "bold",
                fontSize: widthPercentageToDP("8%"),
              }}
            >
              ACCOUNT RECOVERY
            </Text>
            <TextInput
              style={{ ...styles.inputStyle, borderRadius: 10 }}
              mode="outlined"
              label="Email"
              placeholder="Enter your email"
              inputMode="email"
              value={email}
              error={isError}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              mode="outlined"
              style={{ ...styles.inputStyle, borderRadius: 10 }}
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={HideEntry}
              error={isError}
              right={
                <TextInput.Icon
                  onPress={toggleSecureEntry}
                  icon={!HideEntry ? "eye" : "eye-off"}
                />
              }
            />
            <TextInput
              mode="outlined"
              style={{ ...styles.inputStyle, borderRadius: 10 }}
              label="Confirm password"
              placeholder="Re-enter your password"
              value={password_confirmation}
              onChangeText={(text) => setPassword_confirmation(text)}
              secureTextEntry={HideEntry}
              right={
                <TextInput.Icon
                  onPress={toggleSecureEntry}
                  icon={!HideEntry ? "eye" : "eye-off"}
                />
              }
            />
            <Button
              loading={loading}
              disabled={loading}
              style={{ ...styles.buttonStyle, backgroundColor: "black" }}
              mode="contained-tonal"
              icon="account-plus"
              onPress={handleRecovery}
              labelStyle={{ color: "white" }}
            >
              Reset Password
            </Button>
            <Button
              style={{ ...styles.goback }}
              onPress={() => {
                navigator.goBack();
              }}
            >
              Go Back
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
  inputStyle: {
    width: widthPercentageToDP("80%"),
    marginBottom: heightPercentageToDP("3%"),
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
  goback: {
    marginBottom: 40,
  },
});

export default AccountRecoveryScreen;