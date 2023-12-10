import React from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ImageBackground,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { Button, PaperProvider, TextInput, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { FormStyle } from "../Styles/FormStyle";
import UserName from "../components/Forms/UserName";
import Header from "../components/Forms/Header";
import Password from "../components/Forms/Password";
import fetchServices from "../services/fetchServices";
import { useState } from "react";

const LoginScreen = () => {
  const navigator = useNavigation();

  const [HideEntry, setHideEntry] = useState(true);
  const [errors, setErrors] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const [loading, setLoading] = useState(false);

  const showToast = (message = "something went wrong") => {
    ToastAndroid.show(message, 3000);
  };
  const handleLogin = async () => {
    try {
      if (email === "" || password === "") {
        showToast("Please input required data");
        setIsError(true);
        return false;
      }
      // API

      const url = "http://192.168.254.123:8000/api/login";
      const data = {
        email,
        password,
      };

      const result = await fetchServices.postData(url, data);
      console.debug(result);
      console.debug(data);

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
      console.log("Debug");

      console.debug(e.toString());
      showToast(e.toString());
    } finally {
      setLoading(false);
    }
  };
  // password copied

  const toggleSecureEntry = () => {
    setHideEntry(!HideEntry);
  };

  return (
    <PaperProvider>
      <ImageBackground
        source={require("../images/login.png")}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={FormStyle.formContainer}>
          <KeyboardAvoidingView
            behavior="padding"
            style={FormStyle.formContainer}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 10}
          >
            <Header />
            <Text variant="headlineMedium" style={{ marginTop: 5 }}>
              {" "}
              Login
            </Text>
            <SafeAreaView style={{ gap: 7 }}>
              {/* <UserName />
              <Password /> */}
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
            style={FormStyle.button_style}
            mode="contained-tonal"
            icon="login"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
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
    resizeMode: "cover", // or "stretch"
  },
  container: {
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  inputContainerStyle: {
    marginBottom: 16,
  },
  fontSize: {
    fontSize: 18,
  },
});

export default LoginScreen;

