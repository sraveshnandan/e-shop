import { IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export interface ICartInitialState {
  cart: { product: IProduct; quantity: number; totalPrice: number }[] | [];
}
const initialState: ICartInitialState = {
  cart: [],
};
const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addTocart: (state, action) => {
      // checking if item is already present in cart
      const alreadyExists = state.cart.findIndex(
        (item) => item.product.id?.toString() === action.payload.id.toString()
      );
      // if item already exists in cart
      if (alreadyExists !== -1) {
        const cartItem = state.cart[alreadyExists] as any;
        state.cart[alreadyExists].quantity++;
        state.cart[alreadyExists].totalPrice =
          cartItem.product.discountPrice * cartItem.quantity;
        console.log("Product already exists in cart, updating quantity.");
      } else {
        const newItem = {
          product: action.payload as IProduct,
          quantity: 1,
          totalPrice: Number(action.payload.discountPrice),
        };

        state.cart.push(newItem as never);
        console.log("Product added to cart successfully.");
      }
    },
    removeFromCart: (state, action) => {
      // finding index of that particular item
      const alreadyExist = state.cart.findIndex(
        (item) => item.product.id?.toString() === action.payload.id.toString()
      );
      state.cart.splice(alreadyExist, 1);
    },
    increementQuantity: (state, action) => {
      console.log("payload ", action.payload.id);
      // Finding item index
      const itemIndex = state.cart.findIndex(
        (item) => item.product.id === action.payload.id
      );
      if (itemIndex !== -1) {
        const item = state.cart[itemIndex];
        state.cart[itemIndex].quantity++;
        state.cart[itemIndex].totalPrice =
          item.quantity * item.product.discountPrice!;
        console.log("Cart item updated successfully.");
      }
    },
    decreementQuantity: (state, action) => {
      // Finding item index
      const itemIndex = state.cart.findIndex(
        (item) => item.product.id?.toString() === action.payload.id.toString()
      );
      if (state.cart[itemIndex].quantity === 1) {
        state.cart.splice(itemIndex, 1);
        console.log("Product removed successfully.");
      } else {
        const item = state.cart[itemIndex];
        state.cart[itemIndex].quantity--;
        state.cart[itemIndex].totalPrice =
          item.quantity * item.product.discountPrice!;
        console.log("Product details updated successfully.");
      }
    },

    clearCart: (state, action) => {
      state.cart = [];
      console.log("User cart data cleared successfully.");
    },
  },
});

export const {
  addTocart,
  removeFromCart,
  increementQuantity,
  decreementQuantity,
  clearCart,
} = CartSlice.actions;
export default CartSlice.reducer;
