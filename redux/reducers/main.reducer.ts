import { IAds, IBanners, ICategory, IProduct, IUser } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export interface IMainInitialstate {
  authState: boolean;
  isLoading: boolean;
  isError: boolean;
  errMsg: string | "";
  user: IUser | {};
  products: IProduct[] | [];
  banners: IBanners[] | [];
  ads: IAds[] | [];
  categories: ICategory[] | [];
}
const initialState: IMainInitialstate = {
  authState: false,
  isLoading: false,
  isError: false,
  errMsg: "",
  user: {},
  products: [],
  banners: [],
  ads: [],
  categories: [],
};
const userSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setLoadinSate: (state, action) => {
      const prevState = state.isLoading;
      state.isLoading = action.payload;
    },
    setErrorSate: (state, action) => {
      const prevState = state.isError;
      state.isError = action.payload;
    },
    setAllProducts: (state, action) => {
      if (state.products === action.payload) {
        return;
      }
      state.products = action.payload;
    },
    setAllCategories: (state, action) => {
      if (state.categories === action.payload) {
        return;
      }
      state.categories = action.payload;
    },
    setAllBanners: (state, action) => {
      if (state.banners === action.payload) {
        return;
      }
      state.banners = action.payload;
    },
    setUserData: (state, action) => {
      state.authState = true;
      state.user = action.payload;
    },
    setErrorMsg: (state, action) => {
      console.log(action.payload);
      state.errMsg = action.payload;
    },
    setAllAds: (state, action) => {
      if (state.ads === action.payload) {
        return;
      }
      state.ads = action.payload;
    },
  },
});

export const {
  setLoadinSate,
  setAllAds,
  setAllBanners,
  setAllCategories,
  setAllProducts,
  setErrorMsg,
  setUserData,
  setErrorSate,
} = userSlice.actions;

export default userSlice.reducer;
