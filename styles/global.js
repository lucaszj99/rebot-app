import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: "stretch",
  },
  input: {
    padding: 10,
    flex: 9,
  },
  icon: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  white_text: {
    color: "white",
  },
});
