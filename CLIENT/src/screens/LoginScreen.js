import React from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";
import { Button, PaperProvider, TextInput, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { FormStyle } from "../Styles/FormStyle";
import fetchServices from "../services/fetchServices";
import { useState } from "react";
import Toast from "react-native-root-toast";
const LoginScreen = () => {
  const navigator = useNavigation();

  const [HideEntry, setHideEntry] = useState(true);
  const [errors, setErrors] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const showToast = (message = "something went wrong") => {
    Toast.show(message, 3000);
  };

  const handleLogin = async () => {
    try {
      setLoading(!loading);

      if (email === "" || password === "") {
        showToast("Please input required data");
        setIsError(true);
        return false;
      }

      const url = "http://192.168.254.110:8000/api/login";
      const data = {
        email,
        password,
      };

      const result = await fetchServices.postData(url, data);

      if (result.message != null) {
        showToast(result?.message);
      } else {
        navigator.navigate("HomeScreen");
      }

      if (result.message === "User Logged in Successfully") {
        navigator.navigate("HomeScreen");
      } else {
        return false;
      }
    } catch (e) {
      console.debug(e.toString());
      showToast("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const toggleSecureEntry = () => {
    setHideEntry(!HideEntry);
  };

  return (
    <PaperProvider>
      <ImageBackground
        source={require("../images/login.png")}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior="padding"
            style={styles.formContainer}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 15}
          >
            {/* Add the logo here */}
            <Image
              source={require("../images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text
              variant="headlineLarge"
              style={{ marginTop: 5, fontWeight: "bold", fontSize: 40 }}
            >
              Login
            </Text>

            <SafeAreaView style={{ gap: 7 }}>
              <TextInput
                style={FormStyle.input_style}
                mode="outlined"
                label="Email"
                placeholder="Enter your email"
                inputMode="email"
                value={email}
                error={isError}
                onChangeText={(text) => {
                  setEmail(text);
                }}
              />
              <TextInput
                mode="outlined"
                style={FormStyle.input_style}
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={HideEntry}
                right={
                  <TextInput.Icon
                    onPress={toggleSecureEntry}
                    icon={HideEntry ? "eye" : "eye-off"}
                  />
                }
              />
              <Button
                onPress={() => {
                  navigator.navigate("AccountRecoveryScreen");
                }}
              >
                Forgot password?
              </Button>
            </SafeAreaView>
            <Button
              style={{ ...FormStyle.button_style, backgroundColor: "black" }}
              mode="contained-tonal"
              icon="login"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              labelStyle={{ color: "white" }} // Set the text color here
            >
              Log in
            </Button>

            <SafeAreaView
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Not a member?</Text>
              <Button
                mode="text"
                onPress={() => {
                  navigator.navigate("RegisterScreen");
                }}
                loading={loading}
                disabled={loading}
              >
                Sign up now
              </Button>
            </SafeAreaView>
            <Button
              mode="text"
              onPress={() => {
                navigator.navigate("LandingScreen");
              }}
              loading={loading}
              disabled={loading}
            >
              go back
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
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: "23.2%",
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: "40%",
  },
  logo: {
    width: 100,
    height: 100,
    position: "absolute",
    top: 10,
    left: -11,
    alignSelf: "flex-start",
  },
});

export default LoginScreen;
