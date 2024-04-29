import { View, Text, BackHandler, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  errMsg?: string | "Not connected to internet.";
};

const ErrorAlert = ({ errMsg }: Props) => {
  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      className="bg-slate-100"
    >
      {/* Error Alert Box  */}
      <View className="bg-white w-[85%] h-56  rounded-md items-center justify-center shadow-lg shadow-gray-400 ">
        <View className="bg-red-600 p-2 rounded-lg mb-4">
          <Ionicons name="wifi-sharp" size={40} color={"#ffffff"} />
        </View>
        <Text
          className="text-xl mb-4"
          style={{ fontFamily: "Poppin-Semibold" }}
        >
          {errMsg}
        </Text>
        <View className="w-full px-4 flex-row justify-center gap-8">
          <TouchableOpacity
            onPress={() => BackHandler.exitApp()}
            className="bg-red-600 w-[40%] py-2 rounded-full"
          >
            <Text
              className="text-center text-white text-lg "
              style={{ fontFamily: "Poppin-Semibold" }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ErrorAlert;
