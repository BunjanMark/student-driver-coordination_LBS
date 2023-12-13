import React from "react";
import { SafeAreaView, ImageBackground, StyleSheet, Image } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { useState } from "react";
import fetchServices from "../services/fetchServices";

const RegisterScreen = () => {
  const navigator = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [HideEntry, setHideEntry] = useState(true);

  const toggleSecureEntry = () => {
    setHideEntry(!HideEntry);
  };

  const showToast = (message = "Something went wrong") => {
    Toast.show(message, 3000);
  };

  const handleRegistration = async () => {
    try {
      setLoading(!loading);

      if (name === "" || email === "" || password === "") {
        showToast("Please input required data");
        setIsError(true);
        return false;
      }

      if (password !== repassword) {
        showToast("Passwords do not match");
        setIsError(true);
        return false;
      }

      const url = "http://192.168.254.123:8000/api/register";
      const data = {
        name,
        email,
        password,
      };

      const result = await fetchServices.postData(url, data);

      if (result.message != null) {
        showToast(result?.message);
      } else {
        navigator.navigate("HomeScreen");
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
  const newSizeMultiplier = 2; // Make the logo 30% bigger (1.3)

  const newLogoWidth = currentLogoWidth * newSizeMultiplier;
  const newLogoHeight = currentLogoHeight * newSizeMultiplier;

  return (
    <ImageBackground
      source={require("../images/login.png")}
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
          variant="headlineLarge"
          style={{
            marginTop: 5,
            color: "black",
            fontWeight: "bold",
            fontSize: 40,
          }}
        >
          Register
        </Text>

        <TextInput
          style={{ ...styles.input_style, borderRadius: 10 }}
          mode="outlined"
          label="Name"
          error={isError}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={{ ...styles.input_style, borderRadius: 10 }}
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
          style={{ ...styles.input_style, borderRadius: 10 }}
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
          style={{ ...styles.input_style, borderRadius: 10 }}
          label="Confirm password"
          placeholder="Re-enter your password"
          value={repassword}
          onChangeText={(text) => setRepassword(text)}
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
          style={{ ...styles.button_style, backgroundColor: "black" }}
          mode="contained-tonal"
          icon="account-plus"
          onPress={handleRegistration}
          labelStyle={{ color: "white" }}
        >
          Register
        </Button>

        <SafeAreaView
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Already have an account?</Text>
          <Button
            loading={loading}
            disabled={loading}
            onPress={() => navigator.navigate("LoginScreen")}
          >
            Login now
          </Button>
        </SafeAreaView>
        <Button mode="text" onPress={() => navigator.navigate("LandingScreen")}>
          Go back
        </Button>
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
    paddingBottom: "3%",
  },
  logo: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  input_style: {
    width: 300,
    marginBottom: 10,
  },
  button_style: {
    width: 300,
    height: 40,
  },
});

export default RegisterScreen;
