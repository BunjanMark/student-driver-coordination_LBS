import { StyleSheet } from "react-native";
export const FormStyle = StyleSheet.create({
  // container
  formContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  // Header section

  image: {
    objectFit: "scale-down",
    height: 200,
  },
  headerText: {
    fontSize: 24,
  },

  // Inputs

  input_style: {
    width: 350,
  },

  // Button
  button_style: {
    width: 200,
    marginTop: 20,
  },
});
