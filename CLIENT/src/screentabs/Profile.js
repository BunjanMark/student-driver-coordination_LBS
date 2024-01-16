import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDarkMode } from "../components/context/DarkModeContext";
import * as ImagePicker from "expo-image-picker";

const Profile = () => {
  const { darkMode } = useDarkMode();
  const navigator = useNavigation();
  const [editableUsername, setEditableUsername] = useState("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        setEditableUsername(storedUsername || "User Name");

        // Load the stored profile picture URI
        const storedProfilePicture = await AsyncStorage.getItem(
          "profilePicture"
        );
        if (storedProfilePicture) {
          setProfilePicture(storedProfilePicture);
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage:", error);
      }
    };

    fetchData();
  }, []);

  const handleMyProfile = () => alert("Navigate to My Profile");
  const handleLocation = () => alert("Navigate to Location");

  const handleEditProfilePicture = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedImage = result.assets[0];
        setProfilePicture(selectedImage.uri);

        // Save the selected profile picture URI to AsyncStorage
        await AsyncStorage.setItem("profilePicture", selectedImage.uri);

        const formData = new FormData();
        formData.append("profilePicture", {
          uri: selectedImage.uri,
          type: selectedImage.type || "image/jpeg", // Adjust the type based on your server requirements
          name: "profilePicture.jpg",
        });

        // Replace 'https://your-api-endpoint/uploadProfilePicture' with your actual API endpoint
        const response = await fetch(
          "http://192.168.254.110:8000/uploadProfilePicture",
          {
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer YOUR_ACCESS_TOKEN", // Add your authorization token if required
              "Custom-Header": "Custom-Value", // Add any custom headers as needed
            },
          }
        );

        const data = await response.json();
        console.log("Image uploaded successfully:", data);
      } else {
        console.warn("Image selection canceled by user.");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      // Add user-friendly error handling or display an error message to the user
    }
  };

  const handleUsernameChange = (newUsername) =>
    setEditableUsername(newUsername);

  const handleEditUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem("username");
      setEditableUsername(storedUsername || "User Name");
      setIsEditingUsername(true);
    } catch (error) {
      console.error("Error loading username from AsyncStorage:", error);
    }
  };

  const handleSaveUsername = async () => {
    try {
      setIsEditingUsername(false);
      await AsyncStorage.setItem("username", editableUsername);
    } catch (error) {
      console.error("Error saving username to AsyncStorage:", error);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#575757" : "white" },
      ]}
    >
      <Image
        source={require("../images/login.png")}
        style={styles.backgroundImage}
      />

      <View style={styles.userProfile}>
        <View style={styles.userAvatar}>
          {/* Use a placeholder image if the profile picture is not available */}
          <Image
            source={
              profilePicture
                ? { uri: profilePicture }
                : require("../images/placeholder.png")
            }
            style={styles.avatarImage}
          />
        </View>
        <TouchableOpacity
          onPress={handleEditProfilePicture}
          style={styles.editProfileIcon}
        >
          {loading && <ActivityIndicator size="large" color="#3498db" />}
          <Ionicons name="camera" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <View
            style={[
              styles.usernameContainer,
              { justifyContent: "space-between" },
            ]}
          >
            {isEditingUsername ? (
              <TextInput
                style={[
                  styles.editableUsername,
                  darkMode && styles.darkEditableUsername,
                ]}
                value={editableUsername}
                onChangeText={handleUsernameChange}
              />
            ) : (
              <Text style={[styles.userName, darkMode && styles.darkUserName]}>
                {editableUsername}
              </Text>
            )}
            <TouchableOpacity
              onPress={
                isEditingUsername ? handleSaveUsername : handleEditUsername
              }
            >
              <MaterialCommunityIcons
                name={
                  isEditingUsername ? "content-save-edit-outline" : "pencil"
                }
                size={24}
                color=""
              />
            </TouchableOpacity>
          </View>

          <View style={styles.actionContainer}>
            {[
              {
                onPress: () => navigator.navigate("Profile"),
                iconName: "user",
                text: " My Profile     ",
              },
              {
                onPress: () => navigator.navigate("Settings"),
                iconName: "cogs",
                text: " Settings     ",
              },
              {
                onPress:() => navigator.navigate("Map"),
                iconName: "map-marker",
                text: " Location     ",
              },
            ].map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={action.onPress}
                style={[styles.actionItem, darkMode && styles.darkActionItem]}
              >
                <FontAwesome
                  name={action.iconName}
                  size={30}
                  color={darkMode ? "black" : "white"}
                />
                <Text
                  style={
                    darkMode ? styles.darkActionText : styles.lightActionText
                  }
                >
                  {action.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={() => navigator.navigate("LoginScreen")}>
        <View
          style={[styles.logoutButton, darkMode && styles.darkLogoutButton]}
        >
          <FontAwesome
            name="sign-out"
            size={24}
            color={darkMode ? "black" : "white"}
          />
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
    alignItems: "center",
    justifyContent: "center",
  },
  darkContainer: {
    backgroundColor: "#575757", // Dark mode background color
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "106%",
    zIndex: 0,
  },
  userProfile: {
    alignItems: "center",
    marginTop: 260,
    zIndex: 1,
    position: "absolute",
    top: "1%",
  },
  userAvatar: {
    position: "relative",
    width: 120,
    height: 110,
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#fff",
  },
  editProfileIcon: {
    justifyContent: "center",
    alignItems: "center",
    top: 75,
    left: 185,
    borderRadius: 50,
    width: 40,
    height: 40,
    backgroundColor: "darkgray",
    position: "absolute",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  userInfo: {
    marginTop: 100,
    alignItems: "center",
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 50,
    marginTop: 50,
    marginRight: 5,
  },
  darkUserName: {
    color: "white", // Dark mode text color
  },
  editableUsername: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    marginRight: 10,
    justifyContent: "space-between",
    position: "relative",
  },
  darkEditableUsername: {
    color: "black", // Dark mode text color
    borderBottomColor: "black", // Dark mode border color
  },
  actionContainer: {
    flexDirection: "row",
    left: 0,
    right: 0,
    top: "20%",
    transform: [{ translateY: -30 }],
    marginBottom: 10,
  },
  actionItem: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  darkActionItem: {
    borderColor: "white", // Dark mode border color
  },
  lightActionText: {
    color: "white", // Light mode text color
    fontWeight: "bold",
  },
  darkActionText: {
    color: "black", // Dark mode text color
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#f02b49",
    paddingVertical: 5,
    paddingHorizontal: 30,
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 0,
    marginTop: 500,
    position: "relative",
  },
  darkLogoutButton: {
    backgroundColor: "#f02b49", // Dark mode background color
    fontWeight: "bold",
  },
  logoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  darkLogoutButtonText: {
    color: "black", // Dark mode text color
    fontWeight: "bold",
  },
});

export default Profile;
