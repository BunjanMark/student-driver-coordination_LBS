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
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import fetchServices from "../services/fetchServices";
import { FormStyle } from "../Styles/FormStyle";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

const AccountRecoveryRequestScreen = () => {
  const navigator = useNavigation();
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const showToast = (message = "Something went wrong") => {
    Toast.show(message, 3000);
  };

  const handlePasswordResetRequest = async () => {
    try {
      setLoading(true);

      if (email === "") {
        showToast("Please input your email");
        setIsError(true);
        return;
      }

      const url =
        "https://c292-2001-4455-62c-c800-478-e4fb-7367-cf00.ngrok-free.app/api/password/reset/request";

      const data = {
        email,
      };

      const result = await fetchServices.postData(url, data);

      if (result.status) {
        showToast("Password reset link sent successfully");
      } else {
        showToast("Unable to send reset link");
      }
    } catch (error) {
      console.error(error.toString());
      showToast("An error occurred");
    } finally {
      setLoading(false);
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
              PASSWORD RESET REQUEST
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
            <Button
              loading={loading}
              disabled={loading}
              style={{ ...styles.buttonStyle, backgroundColor: "black" }}
              mode="contained-tonal"
              icon="email"
              onPress={handlePasswordResetRequest}
              labelStyle={{ color: "white" }}
            >
              Send Reset Link
            </Button>
            <Button
              onPress={() => {
                navigator.goBack();
              }}
            >
              Go back
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
    marginBottom: heightPercentageToDP("2%"),
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

export default AccountRecoveryRequestScreen;
