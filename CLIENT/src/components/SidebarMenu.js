import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {FontAwesome} from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useDarkMode } from "../components/context/DarkModeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const FixedHeader = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const navigator = useNavigation();
  const isFocused = useIsFocused();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [editableUsername, setEditableUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");  
  const [isEditingUsername, setIsEditingUsername] = useState(false);

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

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

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
    <TouchableWithoutFeedback onPress={closeSidebar}>
      <View style={[styles.container]}>
      <TouchableOpacity
  style={[
    styles.sidebarButton,
    { backgroundColor: darkMode ? 'transparent' : 'transparent' }, // Set background color to transparent for both dark and light modes
  ]}
  onPress={toggleSidebar}
>
  <Icon name="menu" size={25} color="white" />
</TouchableOpacity>



        {isSidebarOpen && isFocused && (
          <View style={[styles.sidebar, darkMode && styles.darkSidebar]}>          
         {/* Display profile picture and username in sidebar */}
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
          </View>
          </View>         
                
          <TouchableOpacity
  style={styles.sidebarItem}
  onPress={() => {
    navigator.navigate("About");
  }}
>
  <Icon
    name="information-circle"
    size={20}
    color="white"  // Always set the color to white
  />
  <Text
    style={[styles.sidebarText]}
  >
    About
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.sidebarItem}
  onPress={() => {
    navigator.navigate("Settings");
  }}
>
  <Icon
    name="settings"
    size={20}
    color="white"  // Always set the color to white
  />
  <Text
    style={[styles.sidebarText]}
  >
    Settings
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.sidebarItem}
  onPress={() => toggleDarkMode(!darkMode)}
>
  <Icon
    name="moon"
    size={20}
    color="white"  // Always set the color to white
  />
  <Text
    style={[styles.sidebarText]}
  >
    Dark Mode
  </Text>
</TouchableOpacity>

<TouchableOpacity               
  style={styles.sidebarItem}
  onPress={() => navigator.navigate("LoginScreen")}
>
  <FontAwesome
    name="sign-out"
    size={24}
    color="white"  // Always set the color to white
  />
  <Text
    style={[styles.logoutText]}
  >
    Logout
  </Text>
</TouchableOpacity>

          </View>    
        </View>
      )}
    </View>
  </TouchableWithoutFeedback>
 );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sidebarButton: {
    position: "absolute",
    top: 20, 
    left: 10, 
    padding: 15,
    zIndex: 2, 
  },
  sidebar: {
    padding: 50,
    borderBottomRightRadius: 10,
    backgroundColor: "green",
    width: "78%", 
    height: 900, 
  },
  darkSidebar: {
    backgroundColor: "#002408", 
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    top: 25,
  },
  sidebarText: {
    color: "white",
    marginLeft: -5,
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    padding: 25,
  },
  darkSidebarText: {
    color: "black", 
    fontWeight: "bold",
  },
  logoutText: {
    color: "white",
    marginLeft: -5,
    fontSize: 20,
    fontWeight: "bold",
    padding: 25,
  },
  darklogoutText: {
    color: "black", 
    fontWeight: "bold",
  },
  userProfile: {
    zIndex: 1,
    position: "relative",
    top: "1%",
    left: "-8%", 
    padding: 20,
    borderRadius: 10,
  },
  userAvatar: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#fff",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  userInfo: {
    marginTop: 170,
    alignItems: "center",
    marginLeft: 180,
    position: "absolute",
  },
  usernameContainer: {
    alignItems: "center",
    position: "absolute",
    bottom: 50,
  },
  userName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    fontStyle: "italic",
  },
  darkUserName: {
    color: "white", 
  },
});

export default FixedHeader;