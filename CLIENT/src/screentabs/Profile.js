import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Button, IconButton } from "react-native-paper";

const Profile = () => {
  const navigation = useNavigation();

  const handleMyProfile = () => {
    // Implement logic for My Profile
    alert("Navigate to My Profile");
  };

  const handleSettings = () => {
    // Implement logic for Settings
    alert("Navigate to Settings");
  };

  const handleLocation = () => {
    // Implement logic for Location
    alert("Navigate to Location");
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const handleEditProfilePicture = () => {
    // Implement logic for editing profile picture
    alert("Edit Profile Picture");
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require("../images/login.png")}
        style={styles.backgroundImage}
      />

      {/* Sidebar Button */}
      <TouchableOpacity style={styles.sidebarButton} onPress={openDrawer}>
        <FontAwesome name="bars" size={30} color="#fff" />
      </TouchableOpacity>

      {/* User Profile */}
      <View style={styles.userProfile}>
        <View style={styles.userAvatar}>
          <TouchableOpacity
            onPress={handleEditProfilePicture}
            style={styles.editProfileIcon}
          >
            <MaterialCommunityIcons name="pencil" size={24} color="#fff" />
          </TouchableOpacity>
          <Image
            source={{ uri: "https://placekitten.com/100/100" }}
            style={styles.avatarImage}
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>User Name</Text>

          {/* Container for My Profile, Settings, and Location */}
          <View style={styles.actionContainer}>
            <TouchableOpacity
              onPress={handleMyProfile}
              style={styles.actionItem}
            >
              <FontAwesome name="user" size={30} color="white" />
              <Text>My Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSettings}
              style={styles.actionItem}
            >
              <FontAwesome name="cogs" size={30} color="white" />
              <Text>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLocation}
              style={styles.actionItem}
            >
              <FontAwesome name="map-marker" size={30} color="white" />
              <Text>Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Log Out button with icon */}
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate("LoginScreen");
        }}
        style={styles.logoutButton}
        labelStyle={styles.logoutButtonText}
        color="white"
      >
        <IconButton icon="logout" color="white" />
        Log Out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  sidebarButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 2,
  },
  userProfile: {
    alignItems: "center",
    marginTop: 50,
    zIndex: 1,
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
  editProfileIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#3498db",
    borderRadius: 12,
    padding: 5,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  userInfo: {
    marginTop: 10,
    alignItems: "center",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "100%",
  },
  actionItem: {
    alignItems: "center",
  },
  logoutButton: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "transparent",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Profile;
