import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("screen").width;

const screenHeight = Dimensions.get("screen").height;
const defaultStyles = StyleSheet.create({
  LoadingContainer: {
    width: screenWidth * 1,
    height: screenHeight * 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { defaultStyles, screenWidth, screenHeight };
