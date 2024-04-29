import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Colors, screenHeight, screenWidth } from "@/constants";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  autoFocus?: boolean;
  filterBtnShow?: boolean | false;
  QValue?: string;
  setQValue?: Dispatch<SetStateAction<string>>;
  homePage?: boolean;
};

const Query = [
  "Mobiles",
  "Smartwatches",
  "Laptops",
  "Electronics",
  "Books",
  "Camera",
];
const SearchBar = ({
  autoFocus,
  filterBtnShow,
  QValue,
  setQValue,
  homePage,
}: Props) => {
  const [recomendQ, setrecomendQ] = useState<string>("Mobiles");

  // For changing the placeholder state
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setrecomendQ(Query[i]);

      if (i === Query.length - 1) {
        i = 0;
      } else {
        i++;
      }
    }, 2500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Final Return
  return (
    <View style={styles.SearchBarContainer}>
      <View
        style={{
          width: homePage ? "100%" : "80%",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.CardBg,
          borderRadius: 6,
          paddingLeft: 15,
        }}
      >
        <Ionicons name="search-sharp" size={25} />
        {/* Search Input  */}
        <TextInput
          value={QValue}
          onChangeText={setQValue}
          placeholder={`Search ${recomendQ}`}
          style={[styles.searchInput, filterBtnShow ? {} : { width: "100%" }]}
          autoFocus={autoFocus}
        />
      </View>

      {/* Filter Button  */}

      {filterBtnShow && (
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="filter-sharp" size={25} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  SearchBarContainer: {
    width: screenWidth * 1,
    padding: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    height: screenHeight * 0.07,
  },
  searchInput: {
    backgroundColor: Colors.CardBg,
    padding: 10,
    fontFamily: "default",
    fontSize: 20,
    width: "85%",
    borderRadius: 6,
  },
  filterBtn: {
    backgroundColor: Colors.CardBg,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    borderRadius: 6,
    height: "100%",
  },
});
