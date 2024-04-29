import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/main.reducer";
import cartReducer from "./reducers/cart.reducer";
import wishlistReducer from "./reducers/wishlist.reducer";

const store = configureStore({
  reducer: {
    main: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { store };
