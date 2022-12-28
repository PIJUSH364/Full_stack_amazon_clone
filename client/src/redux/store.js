import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import userReducer from './userSlice';

const getBasketTotalPrice = (allCartProducts) => {
  return allCartProducts?.reduce(
    (amount, item) => Number(item.price) + amount,
    0
  );
};

const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
  },
});

export default store;
export { getBasketTotalPrice };
