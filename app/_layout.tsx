import { ErrorBox, Loader } from "@/components";
import { RootState, store } from "@/redux/Store";
import {
  setAllAds,
  setAllBanners,
  setAllCategories,
  setAllProducts,
  setErrorMsg,
  setErrorSate,
  setLoadinSate,
} from "@/redux/reducers/main.reducer";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useMemo } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import * as Network from "expo-network";
import { fetchAllData } from "@/utils/actions";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Poppin-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppin-Semibold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppin-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}

function RootLayoutNav() {
  const dispatch = useDispatch();
  // State from main state
  const { isLoading, isError, errMsg, products } = useSelector(
    (state: RootState) => state.main
  );
  //Checking network status
  Network.getNetworkStateAsync().then((res: any) => {
    if (res.isConnected) {
      dispatch(setErrorSate(false));
      dispatch(setErrorMsg(""));
      console.log("Is Network connected : ", res.isConnected);
      console.log("Is Network Reachable : ", res.isInternetReachable);
      console.log("Network Type : ", res.type);
    } else {
      dispatch(setErrorSate(true));
      dispatch(setErrorMsg("Unable to load Data."));
    }
  });

  // Fetching all required data and setting the global state

  const setAllData = async () => {
    dispatch(setLoadinSate(true));
    fetchAllData((res) => {
      dispatch(setLoadinSate(false));
      dispatch(setAllProducts(res.products));
      dispatch(setAllBanners(res.banners));
      dispatch(setAllCategories(res.categories));
      dispatch(setAllAds(res.ads));
      console.log("All required data is fetched and set successfully.");
    });
  };

  // Final useEffect to load app data
  useEffect(() => {
    console.log("all products", products.length);
    // setAllData();
  }, []);

  // Final Return Statement
  return isLoading ? (
    <Loader />
  ) : isError ? (
    <ErrorBox errMsg={"Not connected to internet."} />
  ) : (
    <Stack
      screenOptions={{
        headerTitleStyle: { fontFamily: "Poppin-Semibold" },
        animation: "flip",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(screens)" options={{ headerShown: false }} />
    </Stack>
  );
}
