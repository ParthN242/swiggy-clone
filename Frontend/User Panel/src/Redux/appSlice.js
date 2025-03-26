import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userLoading: false,
  userError: false,
  isAuthOpen: false,
  isAddressModelOpen: false,
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { resDetail: null, cartItems: [] },
  showCartDialogBox: false,
  restaurants: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
    setUserError: (state, action) => {
      state.userError = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuthOpen = action.payload;
    },
    setAddressModel: (state, action) => {
      state.isAddressModelOpen = action.payload;
    },
    setRestaurants: (state, action) => {
      state.restaurants = action.payload;
    },
    addRestaurants: (state, action) => {
      state.restaurants = [action.payload, ...state.restaurants];
    },
    deleteRestaurant: (state, action) => {
      state.restaurants = state.restaurants.filter(
        (rest) => rest._id !== action.payload
      );
    },
    addCartItem: (state, action) => {
      state.cart.resDetail = action.payload.resDetails;
      state.cart.cartItems.push(action.payload.item);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    incrementCartItem: (state, action) => {
      const itemIndex = state.cart.cartItems.findIndex(
        (item) => item._id === action.payload
      );
      if (itemIndex >= 0) {
        state.cart.cartItems[itemIndex].quantity++;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decrementCartItem: (state, action) => {
      // action.payload is id
      state.cart.cartItems.filter((item) => {
        if (item._id === action.payload) {
          if (item.quantity > 0) {
            item.quantity--;
            if (item.quantity === 0) {
              state.cart.cartItems = state.cart.cartItems.filter(
                (cartItem) => cartItem._id !== item._id
              );
              if (state.cart.cartItems.length === 0) {
                state.cart = { resDetail: null, cartItems: [] };
              }
            }
            return true;
          } else {
            return true;
          }
        }
      });
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setCartDialogBox: (state, action) => {
      state.showCartDialogBox = action.payload;
    },
    clearCart: (state, action) => {
      state.cart = { resDetail: null, cartItems: [] };
      localStorage.removeItem("cart");
    },
  },
});

export const {
  setUser,
  setUserLoading,
  setUserError,
  setAuth,
  setAddressModel,
  setRestaurants,
  addRestaurants,
  deleteRestaurant,
  addCartItem,
  incrementCartItem,
  decrementCartItem,
  setCartDialogBox,
  clearCart,
} = appSlice.actions;

export default appSlice.reducer;
