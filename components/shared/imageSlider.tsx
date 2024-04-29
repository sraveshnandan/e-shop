import { Colors, screenHeight, screenWidth } from "@/constants";
import { IBanners } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  ImageStyle,
  ViewStyle,
  TouchableOpacity,
} from "react-native";

interface ISliderProps {
  images?: IBanners[] | [];
  dotColor?: string | "#000";
  inActiveDotColor?: string | "#222";
  delay?: number | 1500;
  infinite?: boolean | false;
  contentStyle?: ImageStyle;
  containerStyle?: ViewStyle;
}

const imageSlider = ({
  images,
  dotColor,
  inActiveDotColor,
  delay,
  infinite,
  containerStyle,
  contentStyle,
}: ISliderProps) => {
  const width = screenWidth * 0.96;
  const height = screenHeight * 0.25;
  // Satates
  const [active, setActive] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [Images, setimages] = useState<IBanners[] | string[]>([]);

  // OnSlider Window Changed
  const onScrollChange = ({ nativeEvent }: { nativeEvent: any }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
    }
  };

  // IF loop is on
  if (infinite === true) {
    useEffect(() => {
      const interval = setInterval(() => {
        if (images && active < images.length) {
          setActive(active + 1);
          scrollViewRef.current?.scrollTo({
            x: (active + 1) * width,
            animated: true,
          });
        } else {
          scrollViewRef.current?.scrollTo({
            x: 0,
            animated: true,
          });
          setActive(0);
        }
      }, delay);
      return () => clearInterval(interval);
    }, [active]);
  }

  // handle image click

  const handleImageClick = (index: number) => {
    return console.log(`${index} image is clicked.`);
  };

  return (
    <View>
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={onScrollChange}
        showsHorizontalScrollIndicator={false}
        style={[styles.sliderContainer, containerStyle ? containerStyle : null]}
        ref={scrollViewRef}
        scrollEventThrottle={16}
      >
        {images &&
          images.map((item, index) => (
            <TouchableOpacity
              onPress={() => handleImageClick(index)}
              key={index}
            >
              <Image
                style={[
                  {
                    width: width,
                    height: height*1.2,
                  },
                  contentStyle ? contentStyle : null,
                ]}
                resizeMethod="auto"
                source={{ uri: item.image?.url }}
              />
            </TouchableOpacity>
          ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images &&
          images.map((i: IBanners, index: number) => (
            <View
              key={index}
              style={
                index === active
                  ? {
                      marginHorizontal: 5,
                      backgroundColor: dotColor,
                      padding: 4,
                      width: 15,
                      borderRadius: 55,
                    }
                  : {
                      marginHorizontal: 5,
                      backgroundColor: "#333",
                      padding: 4,
                      width: 5,
                      borderRadius: 55,
                    }
              }
            ></View>
          ))}
      </View>
    </View>
  );
};

export default imageSlider;

const styles = StyleSheet.create({
  sliderImage: {
    width: screenWidth * 0.96,
    height: "100%",
    resizeMode: "cover",
    marginRight: 2,
  },
  sliderContainer: {
    width: screenWidth * 0.96,
    maxHeight: screenHeight * 0.2,
    overflow: "hidden",
    marginBottom: 25,
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 4,
    left: "35%",
    alignSelf: "flex-start",
    backgroundColor: Colors.White,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 55,
    padding: 4,
  },
});
