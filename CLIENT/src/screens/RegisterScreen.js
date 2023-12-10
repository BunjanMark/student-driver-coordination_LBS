import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider, Text, Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Forms/Header";
// import UserName from "../components/Forms/UserName";
// import Password from "../components/Forms/Password";
import { FormStyle } from "../Styles/FormStyle";
import { KeyboardAvoidingView, ToastAndroid } from "react-native";
import { useState } from "react";
import fetchServices from "../services/fetchServices";
import Toast from "react-native-root-toast";
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

  const showToast = (message = "something went wrong") => {
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
        showToast("Please match the password");
        setIsError(true);
        return false;
      }

      const url = "http://192.168.254.110:8000/api/register";
      const data = {
        name,
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
    } catch (e) {
      console.log("Debug");

      console.debug(e.toString());
      showToast(e.toString());
    } finally {
      setLoading(false);
    }
  };

  // const handleRegistration = async () => {
  //   try {
  //     setLoading(!loading);

  //     if (name === "" || email === "" || password === "") {
  //       showToast("please Input required data");
  //       setIsError(true);
  //       return false;
  //     }

  //     if (password !== repassword) {
  //       showToast("please match the password");
  //       setIsError(true);
  //       return false;
  //     }
  //     const url = "http://192.168.254.110:8000/api/register";
  //     const data = {
  //       name,
  //       email,
  //       password,
  //     };

  //     const result = await fetchServices.postData(url, data);
  //     console.debug(result);
  //     console.debug(data);

  //     if (result.message != null) {
  //       showToast(result?.message);
  //     } else {
  //       navigator.navigate("HomeScreen");
  //     }
  //   } catch (e) {
  //     console.log("debug");
  //     console.debug(e.tostring);
  //     showToast(e.toString());
  //     console.debug(result);
  //     console.debug(data);

  //     console.debug(e.tostring());
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <PaperProvider>
      <SafeAreaView style={FormStyle.formContainer}>
        <KeyboardAvoidingView
          behavior="padding"
          style={FormStyle.formContainer}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 10}
        >
          <Header />
          <Text variant="headlineMedium" style={{ marginTop: 5 }}>
            {" "}
            Register {name} | {email} | {password} | {repassword}
          </Text>
          <TextInput
            style={FormStyle.input_style}
            mode="outlined"
            label="name"
            error={isError}
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />
          <TextInput
            style={FormStyle.input_style}
            mode="outlined"
            label="Email"
            placeholder="Enter your mobile number"
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
            onChangeText={(text) => {
              setPassword(text);
            }}
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
            style={FormStyle.input_style}
            label="Confirm password"
            placeholder="Re-nter your password"
            value={repassword}
            onChangeText={(text) => {
              setRepassword(text);
            }}
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
            style={FormStyle.button_style}
            mode="contained-tonal"
            icon="account-plus"
            // onPress={() => alert("Logged in")}
            onPress={handleRegistration}
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
              onPress={() => {
                navigator.navigate("LoginScreen");
              }}
            >
              Login now
            </Button>
          </SafeAreaView>
          <Button
            mode="text"
            onPress={() => {
              navigator.navigate("LandingScreen");
            }}
          >
            go back
          </Button>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default RegisterScreen;
