import { View, Text, ScrollView } from "react-native";
import React from "react";
import { IProduct } from "@/types";
import { screenWidth } from "@/constants";
import ProductCard from "./ProductCard";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  p: IProduct[] | [];
};

const ProductSlider = ({ p }: Props) => {
  return p.length === 0 ? (
    <View className="bg-white mb-24 mt-4 items-center justify-center rounded-md h-[200]">
      <MaterialCommunityIcons name="timer-sand-empty" size={60} />
      <Text style={{ fontFamily: "Poppin-Semibold" }} className="text-xl mt-4">
        No Products yet.
      </Text>
    </View>
  ) : (
    <ScrollView
      horizontal
      style={{
        width: screenWidth * 0.96,
        marginBottom: 80,
        padding: 4,
      }}
      showsHorizontalScrollIndicator={false}
    >
      {p &&
        p.map((item, index) => (
          <View className="" key={index}>
            <ProductCard pr={item} cardWidth={screenWidth * 0.55} />
          </View>
        ))}
    </ScrollView>
  );
};

export default ProductSlider;
