import { configureStore, combineReducers } from '@reduxjs/toolkit';
import goodsReducer from '../features/goods/goodsSlice';
import cartReducer from '../features/cart/cartSlice';
import ordersReducer from '../features/orders/ordersSlice';

const rootReducer = combineReducers({
  goods: goodsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
