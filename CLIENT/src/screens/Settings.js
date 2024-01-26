import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useDarkMode } from "../components/context/DarkModeContext";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInput as PaperTextInput, Button as PaperButton, Provider as PaperProvider, } from "react-native-paper"; 
import fetchServices from "../services/fetchServices";

const Settings = ({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { darkMode, setDarkMode } = useDarkMode();
  const [editMode, setEditMode] = useState(false);
  const [trackLocation, setTrackLocation] = useState(true);
  const [receiveNotifications, setReceiveNotifications] = useState(true);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [HideEntry, setHideEntry] = useState(true);
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const showToast = (message = "Something went wrong") => {
    Toast.show(message, 3000);
  };
  const toggleSecureEntry = () => {
    setHideEntry(!HideEntry);
  };
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const darkModeValue = await AsyncStorage.getItem("darkMode");
        const trackLocationValue = await AsyncStorage.getItem("trackLocation");
        const receiveNotificationsValue = await AsyncStorage.getItem(
          "receiveNotifications"
        );
        const userEmailFromParams = route.params?.userEmail;
        const usernameValue = await AsyncStorage.getItem("username");

        if (darkModeValue !== null) {
          setDarkMode(JSON.parse(darkModeValue));
        }

        if (trackLocationValue !== null) {
          setTrackLocation(JSON.parse(trackLocationValue));
        }

        if (receiveNotificationsValue !== null) {
          setReceiveNotifications(JSON.parse(receiveNotificationsValue));
        }

        if (userEmailFromParams !== undefined) {
          setUserEmail(userEmailFromParams);
        }

        if (usernameValue !== null) {
          setUsername(usernameValue);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [isFocused]);

  const saveDarkModeState = async (value) => {
    try {
      await AsyncStorage.setItem("darkMode", JSON.stringify(value));
    } catch (error) {
      console.error("Error saving dark mode state:", error);
    }
  };

  const saveSettingsState = async (setting, value) => {
    try {
      await AsyncStorage.setItem(setting, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${setting} state:`, error);
    }
  };

  const handleSwitchChange = (setting) => {
    switch (setting) {
      case "trackLocation":
        const newTrackLocationValue = !trackLocation;
        setTrackLocation(newTrackLocationValue);
        saveSettingsState("trackLocation", newTrackLocationValue);
        break;
      case "receiveNotifications":
        const newReceiveNotificationsValue = !receiveNotifications;
        setReceiveNotifications(newReceiveNotificationsValue);
        saveSettingsState("receiveNotifications", newReceiveNotificationsValue);
        break;
      case "darkMode":
        const newDarkModeValue = !darkMode;
        setDarkMode(newDarkModeValue);
        saveDarkModeState(newDarkModeValue);
        break;
      default:
        break;
    }
  };

  const handleSaveChanges = async () => {
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

  const handleAccountDetailsPress = () => {
    setShowAccountDetails(!showAccountDetails);
    setEditMode(false);
  };

  const handleEditAccountDetailsPress = () => {
    setEditMode(!editMode);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      {/* <Image
        source={require("../images/bg.png")}
        style={styles.backgroundImage}
      /> */}
 
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.backButtonContainer}
        >
          <Text>
            <Icon
              name="ios-arrow-back"
              size={24}
              color={darkMode ? "white" : "black"} // Set the color dynamically based on darkMode
            />
          </Text>
        </TouchableOpacity>
        <Text style={[styles.heading, darkMode && styles.darkHeading]}>
          Settings
        </Text>
      </View>

      <TouchableOpacity onPress={handleAccountDetailsPress}>
        <View style={[styles.accountItem, darkMode && styles.darkAccountItem]}>
          <Text
            style={[styles.accountLabel, darkMode && styles.darkAccountLabel]}
          >
            Account Details
          </Text>
        </View>
      </TouchableOpacity>

      {showAccountDetails && (
        <View
          style={[styles.accountDetails, darkMode && styles.darkAccountDetails]}
        >
          <Text style={[styles.subHeading, darkMode && styles.darkSubHeading]}>
            Email:{" "}
          </Text>
          <Text style={[styles.subText, darkMode && styles.darkSubText]}>
            {email}
          </Text>

          <Text style={[styles.subHeading, darkMode && styles.darkSubHeading]}>
            Username:{" "}
          </Text>
          <Text style={[styles.subText, darkMode && styles.darkSubText]}>
            {username}
          </Text>
        </View>
      )}

      {showAccountDetails && (
        <TouchableOpacity onPress={handleEditAccountDetailsPress}>
          <View
            style={[
              styles.editAccountDetailsContainer,
              darkMode && styles.darkEditAccountDetailsContainer,
            ]}
          >
            <Text
              style={[
                styles.editAccountDetailsText,
                darkMode && styles.darkEditAccountDetailsText,
              ]}
            >
              {editMode ? "CANCEL" : "CHANGE PASSWORD"}
            </Text>
          </View>
        </TouchableOpacity>
      )}
         
      {showAccountDetails && editMode && (
        <>
           <PaperTextInput
            style={{ ...styles.input, borderRadius: 10 }}
            mode="outlined"
            label="Email"
            placeholder="Enter your email"
            inputMode="email"
            value={email}
            error={isError}
            onChangeText={(text) => setEmail(text)}
            disabled={!editMode}
          />
          <PaperTextInput
            mode="outlined"
            style={{ ...styles.input, borderRadius: 10 }}
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={HideEntry}
            error={isError}
            disabled={!editMode}
            right={
              <PaperTextInput.Icon
                onPress={toggleSecureEntry}
                icon={!HideEntry ? "eye" : "eye-off"}
              />
            }
          />
          <PaperTextInput
            mode="outlined"
            style={{ ...styles.input, borderRadius: 10 }}
            label="Confirm password"
            placeholder="Re-enter your password"
            value={password_confirmation}
            onChangeText={(text) => setPassword_confirmation(text)}
            secureTextEntry={HideEntry}
            disabled={!editMode}
            right={
              <PaperTextInput.Icon
                onPress={toggleSecureEntry}
                icon={!HideEntry ? "eye" : "eye-off"}
              />
            }
          />
          <PaperButton
            loading={loading}
            style={{ ...styles.saveButton, backgroundColor: "black" }}
            mode="contained-tonal"
            icon="account-plus"
            onPress={handleSaveChanges}
            labelStyle={{ color: "white" }}
            disabled={!editMode}
          >
            Change Password
          </PaperButton>
        </>
      )}

      <View style={[styles.settingItem, darkMode && styles.darkSettingItem]}>
        <Text
          style={[styles.settingLabel, darkMode && styles.darkSettingLabel]}
        >
          Track Location
        </Text>
        <Switch
          value={trackLocation}
          onValueChange={() => handleSwitchChange("trackLocation")}
        />
      </View>

      <View style={[styles.settingItem, darkMode && styles.darkSettingItem]}>
        <Text
          style={[styles.settingLabel, darkMode && styles.darkSettingLabel]}
        >
          Receive Notifications
        </Text>
        <Switch
          value={receiveNotifications}
          onValueChange={() => handleSwitchChange("receiveNotifications")}
        />
      </View>

      <View style={[styles.settingItem, darkMode && styles.darkSettingItem]}>
        <Text
          style={[styles.settingLabel, darkMode && styles.darkSettingLabel]}
        >
          Dark Mode
        </Text>
        <Switch
          value={darkMode}
          onValueChange={() => handleSwitchChange("darkMode")}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <View
          style={[styles.logoutButton, darkMode && styles.darkLogoutButton]}
        >
          <Text
            style={[
              styles.logoutButtonText,
              darkMode && styles.darkLogoutButtonText,
            ]}
          >
            Logout
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white", // Light mode background color
  },
  darkContainer: {
    backgroundColor: "black", // Dark mode background color
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    zIndex: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  darkHeading: {
    color: "white",
  },
  subHeading: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 10,
    margin: 20,
  },
  darkSubHeading: {
    color: "white", // Dark mode text color
  },
  subText: {
    fontSize: 18,
    marginTop: 0,
    marginBottom: 8,
    margin: 50,
  },
  darkSubText: {
    color: "white", // Dark mode text color
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    margin: 20,
  },
  darkSettingItem: {
    backgroundColor: "transparent", // Dark mode background color
  },
  accountItem: {
    marginBottom: 15,
    margin: 20,
  },
  darkAccountItem: {
    backgroundColor: "transparent", // Dark mode background color
  },
  accountDetails: {
    marginTop: 2,
  },
  darkAccountDetails: {
    backgroundColor: "transparent", // Dark mode background color
  },
  editAccountDetailsContainer: {
    backgroundColor: "lightgray", // Button background color
    padding: 10,
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  darkEditAccountDetailsContainer: {
    backgroundColor: "#2980b9", // Dark mode button background color
  },
  editAccountDetailsText: {
    color: "black", // Button text color
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  darkEditAccountDetailsText: {
    color: "white", // Dark mode button text color
  },
  settingLabel: {
    fontSize: 20,
  },
  darkSettingLabel: {
    color: "white", // Dark mode text color
  },
  accountLabel: {
    fontSize: 20,
  },
  darkAccountLabel: {
    color: "white", // Dark mode text color
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "green",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 8,
    margin: 20,
  },
  darkLogoutButton: {
    backgroundColor: "darkgreen", // Dark mode background color
  },
  logoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  darkLogoutButtonText: {
    color: "white", // Dark mode text color
    fontWeight: "bold",
  },
  input: {
    height: 40,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  darkInput: {
    color: "white",
    backgroundColor: "transparent",
  },
  saveButton: {
    backgroundColor: "#3498db", // Save button background color
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: "center",
  },
  darkSaveButton: {
    backgroundColor: "#2980b9", // Dark mode save button background color
  },
  backButtonContainer: {
    marginLeft: 10,
  },
});

export default Settings;