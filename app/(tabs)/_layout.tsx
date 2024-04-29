import React, { useEffect } from "react";
import { Tabs, router } from "expo-router";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { tintColor } from "@/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { useSegments } from "expo-router";

export default function TabLayout() {
  const segment = useSegments();
  // accessing some global state
  const { cart } = useSelector((state: RootState) => state.cart);
  const { wishlist } = useSelector((state: RootState) => state.wishlist);

  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: "Poppin-Semibold",
        },
        tabBarActiveTintColor: tintColor,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              size={focused ? 30 : 28}
              color={color}
            />
          ),
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            display: segment.includes("Home" as never) ? "flex" : "none",
          },
        }}
      />

      <Tabs.Screen
        name="Wishlist"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={focused ? 30 : 25}
              color={color}
            />
          ),
          tabBarLabel: "Wishlist",
          tabBarLabelStyle: {
            display: segment.includes("Wishlist" as never) ? "flex" : "none",
          },
          tabBarBadge: wishlist.length > 0 ? wishlist.length : undefined,
        }}
      />

      <Tabs.Screen
        name="Cart"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "shopping" : "shopping-outline"}
              size={focused ? 30 : 25}
              color={color}
            />
          ),
          tabBarLabel: "Cart",
          tabBarLabelStyle: {
            display: segment.includes("Cart" as never) ? "flex" : "none",
          },
          tabBarBadge: cart.length > 0 ? cart.length : undefined,
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={focused ? 30 : 25}
              color={color}
            />
          ),
          tabBarLabel: "Account",
          tabBarLabelStyle: {
            display: segment.includes("Profile" as never) ? "flex" : "none",
          },
        }}
      />
    </Tabs>
  );
}
