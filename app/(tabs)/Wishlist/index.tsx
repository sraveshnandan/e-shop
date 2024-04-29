import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { router, useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { IProduct } from "@/types";
import { ProductCard } from "@/components";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants";
import { clearWishlist } from "@/redux/reducers/wishlist.reducer";

type Props = {};

const WishlistPage = (props: Props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // accessing all wishlist data
  const { wishlist } = useSelector((state: RootState) => state.wishlist);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        wishlist.length !== 0 ? (
          <TouchableOpacity
            onPress={() => dispatch(clearWishlist({}))}
            style={{ backgroundColor: Colors.CardBg }}
            className="flex-row items-center   px-2 py-1 rounded-full shadow-lg shadow-black/80"
          >
            <Ionicons name="trash-sharp" color={Colors.Red} size={20} />
            <Text className="text-red-600 font-semibold text-lg ">Clear</Text>
          </TouchableOpacity>
        ) : null,
    });
  }, [wishlist.length]);

  return wishlist.length === 0 ? (
    // Empty wishlist state
    <View className="flex-1  items-center justify-center">
      <Ionicons
        name="heart-dislike-circle-sharp"
        size={150}
        color={Colors.Red}
      />
      <Text style={{ fontFamily: "Poppin-Semibold" }} className="text-3xl mt-2">
        Opp's
      </Text>
      <Text className="text-xl mt-2" style={{ fontFamily: "Poppin-Semibold" }}>
        Nothing in your Wishlist.
      </Text>
      <TouchableOpacity
        className="bg-black rounded-full mt-8 w-[76%] py-3 self-center "
        onPress={() => router.replace(`/(tabs)/Home/`)}
      >
        <Text className="text-white text-center text-xl">
          Continue Shopping
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    // rendering all wishlist items
    <ScrollView className="flex-1 ">
      {/* All Wishlist Product List  */}
      <View className="flex-row flex-wrap justify-center self-center w-[100%]">
        {wishlist &&
          wishlist.map((item: IProduct, index) => (
            // Outer product container
            <ProductCard key={index} pr={item} />
          ))}
      </View>
    </ScrollView>
  );
};

export default WishlistPage;
