import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useDarkMode } from "../components/context/DarkModeContext";
import Icon from "react-native-vector-icons/Ionicons";

const Settings = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { darkMode, setDarkMode } = useDarkMode();
  const [editMode, setEditMode] = useState(false);
  const [trackLocation, setTrackLocation] = useState(true);
  const [receiveNotifications, setReceiveNotifications] = useState(true);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [email, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const darkModeValue = await AsyncStorage.getItem("darkMode");
        const trackLocationValue = await AsyncStorage.getItem("trackLocation");
        const receiveNotificationsValue = await AsyncStorage.getItem(
          "receiveNotifications"
        );
        const userEmailValue = await AsyncStorage.getItem("userEmail");
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

        if (userEmailValue !== null) {
          setUserEmail(userEmailValue);
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
      // Add more cases for additional settings
      default:
        break;
    }
  };

  const handleSaveChanges = () => {
    saveSettingsState("password", password);
    setEditMode(false);
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
              {editMode ? "CANCEL EDIT" : "EDIT PASSWORD"}
            </Text>
          </View>
        </TouchableOpacity>
      )}

      {editMode && (
        <>
          <Text style={[styles.subHeading, darkMode && styles.darkSubHeading]}>
            Change Password
          </Text>
          <TextInput
            style={[styles.input, darkMode && styles.darkInput]}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />

          <TouchableOpacity onPress={handleSaveChanges}>
            <View
              style={[styles.saveButton, darkMode && styles.darkSaveButton]}
            >
              <Text
                style={[
                  styles.saveButtonText,
                  darkMode && styles.darkSaveButtonText,
                ]}
              >
                Save
              </Text>
            </View>
          </TouchableOpacity>
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
    borderColor: "gray",
    borderWidth: 1,
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
