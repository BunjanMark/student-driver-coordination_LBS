import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Forms/Header";
import { PaperProvider, Text } from "react-native-paper";
import { FormStyle } from "../Styles/FormStyle";
import Email from "../components/Forms/Email";
const AccountRecoveryScreen = () => {
  return (
    <PaperProvider>
      <SafeAreaView style={FormStyle.formContainer}>
        <Header />
        <Text variant="headlineMedium" style={{ marginTop: 5 }}>
          {" "}
          Account Recovery
        </Text>
        <Email />
      </SafeAreaView>
      <SafeAreaView></SafeAreaView>
    </PaperProvider>
  );
};

export default AccountRecoveryScreen;
