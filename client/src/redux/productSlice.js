import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartProducts: [],
  productIds: [],
  productInfo: {},
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartProducts = action.payload;
    },
    removeFromCart: (state, action) => {
      state.cartProducts = action.payload;
    },
    addProductId: (state, action) => {
      state.productIds = action.payload;
    },
    showProductDetails: (state, action) => {
      state.productInfo = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { addToCart, removeFromCart, addProductId, showProductDetails } =
  productSlice.actions;
