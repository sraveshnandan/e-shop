import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { IProduct } from "@/types";
import { ProductCard } from "@/components";

type Props = {};

const AllProducts = (props: Props) => {
  const { products } = useSelector((state: RootState) => state.main);
  return (
    <ScrollView className="flex-1">
      {/* Products lists  */}
      <View className="flex-row flex-wrap w-full">
        {products &&
          products.map((item: IProduct) => (
            <ProductCard pr={item} key={item.id} />
          ))}
      </View>
    </ScrollView>
  );
};

export default AllProducts;
