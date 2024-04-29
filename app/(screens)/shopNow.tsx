import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { Colors, screenWidth } from "@/constants";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

const paymentMode = [
  { name: "Online Payment", icon: "cash-outline" },
  { name: "Cash on Delivery", icon: "car-outline" },
  { name: "Pay Later", icon: "play-forward" },
];

const shopNow = (props: Props) => {
  const navigation = useNavigation();
  const { cart } = useSelector((state: RootState) => state.cart);

  // local states
  const [cartOriginalPrice, setcartOriginalPrice] = useState<number>(
    cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem?.product?.originalPrice!;
    }, 0)
  );

  const [cartDiscountedPrice, setcartDiscountedPrice] = useState<number>(
    cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem?.totalPrice;
    }, 0)
  );
  const [promoCodeDiscount, setpromoCodeDiscount] = useState<number>(0);
  const [deliverCharge, setdeliveryCharge] = useState<number>(0);

  // setting header Data
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Complete Checkout",
      headerTitleAlign: "center",
    });
  }, []);
  console.log("cart length", cart.length);
  return (
    <>
      <ScrollView className="flex-1 border-2">
        {/* Delivery address choose section  */}
        <View></View>

        {/* Payment mode choosing section  */}
        <View className=" w-[96%] self-center p-2">
          <Text className="text-xl" style={{ fontFamily: "Poppin-Semibold" }}>
            Payment Mode
          </Text>
          {paymentMode &&
            paymentMode.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white my-1 py-4 px-2 rounded-md flex-row items-center justify-start"
              >
                <Ionicons name={item.icon as any} size={25} />
                <Text className="text-lg font-semibold ml-4">{item.name}</Text>
              </TouchableOpacity>
            ))}
        </View>

        {/* Order Summary section  */}

        <View className=" w-[96%] self-center p-2">
          <Text className="text-xl" style={{ fontFamily: "Poppin-Semibold" }}>
            Order
          </Text>

          {/* Main Order details section  */}
          <View className="w-full bg-white rounded-md mt-2 p-2">
            {/* small product slider section  */}
            <ScrollView horizontal className="w-[100%]">
              {cart &&
                cart.map((item) => (
                  <View
                    key={item.product.id}
                    style={{
                      width: screenWidth * 0.82,
                      padding: 4,
                      backgroundColor: Colors.CardBg,
                      borderRadius: 8,
                      marginRight: 10,
                      flexDirection: "row",
                      gap: 4,
                    }}
                  >
                    {/* Product Image  */}
                    <View className="bg-white ml-4 overflow-hidden rounded-lg  w-[82] h-[82]">
                      <Image
                        style={{ width: 80, height: 80, resizeMode: "contain" }}
                        source={{ uri: item.product.thumbnail?.url }}
                      />
                    </View>
                    {/* Product Details  */}
                    <View className="flex-grow ml-2">
                      <Text
                        className="text-2xl"
                        style={{ fontFamily: "Poppin-Regular" }}
                      >
                        {item.product.title?.substring(0, 10)}...
                      </Text>

                      <View className="w-full flex-row items-center">
                        <Text className="text-lg">Price:</Text>
                        <Text className="text-xl ml-2 font-semibold">
                          ₹{item.product.originalPrice}
                        </Text>
                      </View>
                    </View>
                    <Text className="absolute top-2  right-2 text-lg font-semibold">
                      x{item.quantity}
                    </Text>
                  </View>
                ))}
            </ScrollView>
            {/* order price details section  */}
            <View className="border-t-2 border-gray-200 my-2">
              {/* each price section  */}
              <View className="flex-row w-full items-center justify-between">
                <Text className="text-lg font-semibold text-gray-400">
                  Price :
                </Text>
                <Text className="text-lg font-semibold">
                  ₹{cartOriginalPrice}
                </Text>
              </View>

              <View className="flex-row w-full items-center justify-between">
                <Text className="text-lg font-semibold text-gray-400">
                  Discount :
                </Text>
                <Text className="text-lg font-semibold text-green-600">
                  ₹{cartOriginalPrice - cartDiscountedPrice}
                </Text>
              </View>

              <View className="flex-row w-full items-center justify-between">
                <Text className="text-lg font-semibold text-gray-400">
                  Promo Code :
                </Text>
                <Text className="text-lg font-semibold">
                  ₹{promoCodeDiscount}
                </Text>
              </View>

              <View className="flex-row w-full items-center justify-between">
                <Text className="text-lg font-semibold text-gray-400">
                  Delivery Charge :
                </Text>
                <Text className="text-lg font-semibold">₹{deliverCharge}</Text>
              </View>

              {/* Total Price Section  */}
              <View className="border-t-2 border-gray-200 w-full mt">
                <View className="flex-row w-full items-center justify-between">
                  <Text className="text-lg font-semibold">Total Price :</Text>
                  <Text className="text-lg font-semibold text-green-600">
                    ₹{cartDiscountedPrice}/-
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Payment Button  */}
      <TouchableOpacity className="bg-black py-4 my-2 w-[96%] self-center rounded-full flex-row items-center justify-center">
        <Ionicons name="lock-closed-sharp" size={25} color={Colors.White} />
        <Text className="text-white ml-4 font-semibold text-center text-xl">
          Pay
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default shopNow;
