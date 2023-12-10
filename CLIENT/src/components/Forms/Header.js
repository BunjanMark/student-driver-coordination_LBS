import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
import { FormStyle } from "../../Styles/FormStyle";
import { Image } from "react-native";
const Header = () => {
  return (
    <SafeAreaView
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Image
        style={FormStyle.image}
        source={require("../../images/images.jpg")}
      /> */}
      <Image
        style={FormStyle.image}
        source={require("../../images/images.jpg")}
      />
    </SafeAreaView>
  );
};

export default Header;
