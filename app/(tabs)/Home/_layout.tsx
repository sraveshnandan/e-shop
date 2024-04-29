import React from "react";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { tintColor } from "@/constants";

type Props = {};

const HomeLayout = (props: Props) => {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerBlurEffect: "dark",
          headerLeft: () => (
            <Ionicons
              name="bag-check-sharp"
              size={28}
              style={{ marginRight: 10 }}
              color={tintColor}
            />
          ),

          headerTitle: "Shop",
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: tintColor,
          },
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
