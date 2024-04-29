import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { ICategory, IProduct } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Colors, tintColor } from "@/constants";
import { ProductImgSlider, ProductSlider } from "@/components";
import Markdown from "react-native-markdown-display";
import { addTocart } from "@/redux/reducers/cart.reducer";
import { addToWishlist } from "@/redux/reducers/wishlist.reducer";

type Props = {};

const ProductDetails = (props: Props) => {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // Global Root state
  const { products } = useSelector((state: RootState) => state.main);
  const { cart } = useSelector((state: RootState) => state.cart);
  const { wishlist } = useSelector((state: RootState) => state.wishlist);
  // Local state
  const [product, setproduct] = useState<IProduct>({});
  const [similarProduct, setsimilarProduct] = useState<IProduct[] | []>(
    products
  );
  // Cart added status
  const [addedToCart, setaddedToCart] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);

  // Final layout effect to set data
  useLayoutEffect(() => {
    // finding product details from all Products
    const p: IProduct | any = products.find(
      (p) => p.id?.toString() === params.product_id.toString()
    );

    //checing if product is already liked bu user
    const alreadyLiked = wishlist.findIndex((item) => item.id === p.id);
    console.log("already exists", alreadyLiked);
    if (alreadyLiked === -1) {
      setLiked(false);
    } else {
      setLiked(true);
    }
    // checking if product is already added in cart
    const alreadyExistInCart = cart.findIndex(
      (item) => item.product.id === p.id
    );
    if (alreadyExistInCart === -1) {
      setaddedToCart(false);
    } else {
      setaddedToCart(true);
    }

    // Setting header data
    navigation.setOptions({
      headerShown: true,
      headerTitleStyle: {
        fontFamily: "Poppin-Semibold",
      },
      headerTitleAlign: "center",
      headerTitle: `${p.title.substring(0, 12)}...`,
      headerRight: () => (
        <View style={{ gap: 20 }} className="flex-row items-center p-1">
          <Ionicons name="share-outline" size={28} />
          <Ionicons
            onPress={() => {
              dispatch(addToWishlist({ ...p }));
            }}
            name={liked ? "heart-sharp" : "heart-outline"}
            color={Colors.Red}
            size={28}
          />
        </View>
      ),
    });
  }, [params, cart.length, wishlist.length]);

  useEffect(() => {
    // setting product data
    const p: IProduct | any = products.find(
      (p) => p.id?.toString() === params.product_id.toString()
    );
    const similarP = products.filter((pr) => pr.id !== p.id);
    const sp = similarP.filter((prd) =>
      prd?.categories?.some((c: ICategory) => c.name === p.categories[1]?.name)
    );
    console.log(`Details of ${p.title.substring(0, 15)}...`);
    setproduct(p);
    setsimilarProduct(sp);
    console.log("similar product", sp.length);
  }, []);

  return (
    <>
      <ScrollView className="mx-auto py-4">
        {/* Product Image slider  */}
        <ProductImgSlider
          dotColor={tintColor}
          inActiveDotColor="#222"
          images={product.images}
        />

        {/* Product Pricing section  */}

        <View className="flex-row items-center mt-4">
          <Text className="text-4xl mr-4 text-green-600">
            ₹{product.discountPrice}
          </Text>
          <Text className="text-xl text-gray-400 line-through">
            ₹{product.originalPrice}
          </Text>

          {/* Custom brand promo  */}
        </View>
        <Text className="text-gray-400 text-xl">Special by brand</Text>
        {/* Product Description section  */}
        <View className="w-[96%] my-4">
          <Text
            className="text-black text-2xl "
            style={{ fontFamily: "Poppin-Semibold" }}
          >
            Description
          </Text>
          <Markdown>{product.description}</Markdown>
        </View>

        {/* Product Property Section  */}
        <View className="w-[96%] my-2">
          <Text
            className="text-black text-2xl "
            style={{ fontFamily: "Poppin-Semibold" }}
          >
            Specifications
          </Text>
          {product.property &&
            product.property.map((item, index) => {
              const KeyValue = Object.entries(item);

              return (
                <View key={index} className="my-4">
                  {KeyValue.map((item, index) => (
                    <View className="flex-row justify-between items-center">
                      <Text
                        className="text-xl text-gray-500"
                        style={{ fontFamily: "Poppin-Regular" }}
                      >
                        {item[0]}&nbsp;:
                      </Text>
                      <Text
                        className="text-xl font-semibold"
                        style={{ fontFamily: "Poppin-Regular" }}
                      >
                        {item[1]}
                      </Text>
                    </View>
                  ))}
                </View>
              );
            })}
        </View>

        {/* Product Review section  */}
        {/* In next update  */}
        {/* Similar Products Section  */}
        <View className="my-4">
          <Text
            className="text-black text-2xl "
            style={{ fontFamily: "Poppin-Semibold" }}
          >
            Similar Products
          </Text>

          {/* Similar Products Slider   */}
          <ProductSlider p={similarProduct} />
        </View>
      </ScrollView>

      {/* Add to cart button  */}

      <TouchableOpacity
        className={
          "bg-black absolute z-10 bottom-1 w-[99%] self-center rounded-md py-4"
        }
        style={[addedToCart ? { backgroundColor: "green" } : {}]}
        onPress={() => {
          if (addedToCart) {
            router.replace(`/(tabs)/Cart/`);
          } else {
            dispatch(addTocart(product));
            setaddedToCart((prev) => !prev);
          }
        }}
      >
        <Text
          className="text-white text-center text-xl"
          style={{ fontFamily: "Poppin-Semibold" }}
        >
          {addedToCart ? "Go to Cart" : "Add to Cart"}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default ProductDetails;
