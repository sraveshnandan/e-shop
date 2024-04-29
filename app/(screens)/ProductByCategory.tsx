import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { IProduct } from "@/types";
import { ProductCard } from "@/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {};

const ProductByCategory = (props: Props) => {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  // global state
  const { products } = useSelector((state: RootState) => state.main);

  // local state
  const [filteredProducts, setfilteredProducts] = useState<IProduct[] | []>([]);

  // final layout effect to load data
  useLayoutEffect(() => {
    // filtering products and setting the state
    const allProducts = products.filter((item) =>
      item.categories?.some((c) => c.name === params.cName)
    );
    setfilteredProducts(allProducts);

    // setting header data
    navigation.setOptions({
      headerTitle: `${params.cName}`,
    });
  }, []);

  return filteredProducts.length === 0 ? (
    <View className="flex-1 items-center justify-center ">
      <View className="bg-white w-[95%] rounded-md shadow-lg shadow-black/60 items-center justify-center">
        <MaterialCommunityIcons name="emoticon-sad-outline" size={100} />
        <Text className="text-2xl  mt-4 font-semibold">No Products yet.</Text>
        <TouchableOpacity
          onPress={() => router.replace(`/(tabs)/Home/`)}
          className="bg-black my-4 w-[70%] rounded-full py-3"
        >
          <Text className="text-white text-xl font-semibold text-center">
            Go to Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <ScrollView className="flex-1">
      {/* Product List  */}
      <View className="flex-row flex-wrap">
        {filteredProducts &&
          filteredProducts.map((item: IProduct, index) => (
            <ProductCard key={index} pr={item} />
          ))}
      </View>

      {/* If there is no products in respective category  */}
    </ScrollView>
  );
};

export default ProductByCategory;
