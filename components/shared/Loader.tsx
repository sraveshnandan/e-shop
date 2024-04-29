import { ImageBackground, ActivityIndicator } from "react-native";
import React, { useLayoutEffect } from "react";
import { defaultStyles, tintColor } from "@/constants";

type Props = {};

const Loader = (props: Props) => {
  useLayoutEffect(() => {
    return () => {};
  }, []);
  return (
    <ImageBackground
      source={require("../../assets/images/splash.png")}
      blurRadius={2}
      style={defaultStyles.LoadingContainer}
    >
      <ActivityIndicator animating={true} color={tintColor} size={50} />
    </ImageBackground>
  );
};

export default Loader;
