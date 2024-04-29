import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { ICategory } from "@/types";
import { Colors, screenHeight, screenWidth } from "@/constants";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

type Props = {
  c: ICategory[];
};

const CategorySlider = ({ c }: Props) => {
  return c === undefined ? (
    <View className="bg-slate-400 w-[96%] h-[200] items-center justify-center mt-[50%] py-8 rounded-lg  ">
      <AntDesign name="warning" color={Colors.Red} size={45} />
      <Text
        className="text-white text-2xl mt-4"
        style={{ fontFamily: "Poppin-Semibold" }}
      >
        Unable to load data
      </Text>
    </View>
  ) : (
    <View style={{ width: screenWidth * 0.96, marginVertical: 15 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {c.length > 0 &&
          c.map((c: ICategory) => (
            <TouchableOpacity
              key={c.id}
              style={{
                width: screenWidth * 0.24,
                height: screenHeight * 0.14,
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                backgroundColor: Colors.White,
                borderRadius: 6,
                marginRight: 15,
              }}
              onPress={() => {
                console.log(`${c.name} button is pressed.`);
                router.push(
                  `/(screens)/ProductByCategory?cName=${c.name}` as any
                );
              }}
            >
              {/* Image box  */}
              <View className="border-2 border-gray-400 rounded-full overflow-hidden items-center justify-center ">
                <Image
                  style={{
                    width: 55,
                    height: 55,
                  }}
                  resizeMethod="auto"
                  source={{ uri: c?.image?.url }}
                />
              </View>

              {/* Category Name  */}

              <Text
                className="text-xs mt-2"
                style={{
                  fontFamily: "Poppin-Semibold",
                }}
              >
                {c.name}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default CategorySlider;
