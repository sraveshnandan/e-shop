import React from "react";
import { Stack } from "expo-router";

type Props = {};

const AuthLayout = (props: Props) => {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerShadowVisible: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerTitleAlign: "left", headerTitle: "Profile" }}
      />
    </Stack>
  );
};

export default AuthLayout;
