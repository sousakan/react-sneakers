import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCartOpen: false,
  orderNumber: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartOpened(state) {
      state.isCartOpen = true;
    },
    cartClosed(state) {
      state.isCartOpen = false;
    },
    orderNumberIncremented(state) {
      state.orderNumber += 1;
    },
  },
});

export const { cartOpened, cartClosed, orderNumberIncremented } =
  cartSlice.actions;

export default cartSlice.reducer;
