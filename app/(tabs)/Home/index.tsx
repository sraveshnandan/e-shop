import React, { useLayoutEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router, useNavigation } from "expo-router";
import { tintColor } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import {
  CategorySlider,
  ImagePreviewBox,
  ImageSlider,
  ProductCard,
  ProductImgSlider,
  ProductSlider,
} from "@/components";
import { IProduct } from "@/types";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

const HomeScreen = (props: Props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { products, banners, categories } = useSelector(
    (state: RootState) => state.main
  );
  const { cart } = useSelector((state: RootState) => state.cart);
  const { wishlist } = useSelector((state: RootState) => state.wishlist);

  //setting search bar query to an state

  const [searchQuery, setsearchQuery] = useState<string>("");
  const [showPrev, setshowPrev] = useState<boolean>(false);
  const [prevImg, setprevImg] = useState<string>("");

  useLayoutEffect(() => {
    // creating search bar
    navigation.setOptions({
      headerRight: () => (
        <View className="p-1 bg-slate-200 rounded-md ">
          <Ionicons
            onPress={() => console.log("Notification icon pressed.")}
            name="notifications-outline"
            size={28}
          />
        </View>
      ),
    });
  }, []);
  return showPrev ? (
    <ImagePreviewBox prevImg={prevImg} setShowImgPrev={setshowPrev} />
  ) : (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      showsVerticalScrollIndicator={false}
    >
      {/* Category slider section  */}
      <CategorySlider c={categories} />
      {/* Image Slider section  */}
      <ImageSlider
        images={banners}
        dotColor={tintColor}
        infinite={true}
        delay={1500}
      />
      {/* Best deals Product section  */}

      {/* Section Heading  */}
      <View className="mt-4 flex-row  items-center w-[95%] justify-between">
        <Text
          className="text-xl "
          style={{ fontFamily: "Poppin-Semibold", color: tintColor }}
        >
          Best Deals
        </Text>
        {/* CTA action button  */}
        <TouchableOpacity
          className="bg-white py-2 px-6 shadow-lg shadow-black/40  rounded-full"
          onPress={() => router.push(`/(screens)/AllProducts`)}
        >
          <Text className="text-md " style={{ fontFamily: "Poppin-Semibold" }}>
            All
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-[96%] flex-wrap  py-4 flex-row  justify-center ">
        {products &&
          products.length > 0 &&
          products
            .slice(0, 4)
            .map((p: IProduct) => (
              <ProductCard
                key={p.id}
                pr={p}
                setShowPrev={setshowPrev}
                setprevImg={setprevImg}
                showPrev={showPrev}
              />
            ))}
      </View>

      {/* Other section  */}

      {/* Section Heading  */}
      <View className="mt-4 flex-row  items-center w-[95%] justify-between">
        <Text
          className="text-xl "
          style={{ fontFamily: "Poppin-Semibold", color: tintColor }}
        >
          From your Wishlist
        </Text>
      </View>
      {wishlist && (
        <View className="w-[96%] self-center">
          <ProductSlider key={Math.random()} p={wishlist} />
        </View>
      )}

      {/* Section Heading  */}
      <View className="mt-4 flex-row  items-center w-[95%] justify-between">
        <Text
          className="text-xl "
          style={{ fontFamily: "Poppin-Semibold", color: tintColor }}
        >
          Items in your cart
        </Text>
      </View>
      {cart && (
        <View className="w-[96%] self-center">
          <ProductSlider key={Math.random()} p={cart.map((i) => i.product)} />
        </View>
      )}
    </ScrollView>
  );
};

export default HomeScreen;
