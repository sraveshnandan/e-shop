import { IProduct } from "@/types";
import { Action, createSlice } from "@reduxjs/toolkit";

export interface ICartInitialState {
  wishlist: IProduct[] | [];
}
const initialState: ICartInitialState = {
  wishlist: [],
};
const WishlistSlice = createSlice({
  name: "Wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      // checking if item is already present in cart
      const alreadyExists = state.wishlist.findIndex(
        (item) => item.id?.toString() === action.payload.id.toString()
      );

      // if item already exists in cart
      if (alreadyExists !== -1) {
        state.wishlist.splice(alreadyExists, 1);
        console.log(
          "Product already exists in Wishlist, removing it from wishlist."
        );
      } else {
        const newProduct = action.payload;
        state.wishlist.push(newProduct);
        console.log("Product added to wishlist successfully.");
      }
    },
    clearWishlist: (state, action) => {
      state.wishlist = [];
      console.log("User Wishlist data cleared successfully.");
    },
  },
});

export const { clearWishlist, addToWishlist } = WishlistSlice.actions;
export default WishlistSlice.reducer;
