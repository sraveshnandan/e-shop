import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, headerTitleAlign: "center" }}>
      <Stack.Screen name="ProductDetails" />
      <Stack.Screen name="shopNow" options={{ headerShown: true }} />
      <Stack.Screen name="ProductByCategory" options={{ headerShown: true }} />
      <Stack.Screen
        name="AllProducts"
        options={{ headerShown: true, headerTitle: "All Products" }}
      />
    </Stack>
  );
};

export default StackLayout;
