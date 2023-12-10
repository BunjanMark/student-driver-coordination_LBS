import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { FormStyle } from "../../Styles/FormStyle";

const Header = () => {
  return (
    <SafeAreaView
      style={{
        flexDirection: "row",  // Make it a row to align items horizontally
        alignItems: "left",
        paddingHorizontal: 16,  // Add padding for spacing
        paddingTop: 16,  // Add padding for spacing
        width: 570,
        bottom: 290,
      }}
    >
      <Image
        style={FormStyle.image}
        source={require("../../images/logo.png")}  // Adjust the path to your logo
      />
      {/* You can add more elements or text for your header */}
    </SafeAreaView>
  );
};

export default Header;
