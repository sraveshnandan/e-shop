import React from "react";
import { Stack } from "expo-router";

type Props = {};

const AuthLayout = (props: Props) => {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerShadowVisible: true,
        headerTitleStyle: {
          fontFamily: "Poppin-Semibold",
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "Wishlists" }} />
    </Stack>
  );
};

export default AuthLayout;
