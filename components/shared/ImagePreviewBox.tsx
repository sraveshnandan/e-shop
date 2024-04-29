import { View, TouchableOpacity, Image } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors, screenHeight, screenWidth } from "@/constants";

type Props = {
  prevImg: string;
  setShowImgPrev: Dispatch<SetStateAction<boolean>>;
};

const ImagePreviewBox = ({ prevImg, setShowImgPrev }: Props) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.1)",
      }}
    >
      <Image
        style={{
          width: "96%",
          height: "50%",
        }}
        resizeMethod="auto"
        source={{ uri: prevImg }}
      />

      <TouchableOpacity
        style={{
          backgroundColor: Colors.White,
          position: "absolute",
          top: "2%",
          right: "5%",
          padding: 10,
          borderRadius: 55,
        }}
        onPress={() => setShowImgPrev((prev) => !prev)}
      >
        <Ionicons size={28} name="close-sharp" color={"red"} />
      </TouchableOpacity>
    </View>
  );
};

export default ImagePreviewBox;
