import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Good from '../../types/Good';
import { nanoid } from '@reduxjs/toolkit';

const initialState: Good[] = [];

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    ordersAdded: {
      reducer(state, action: PayloadAction<Good[]>) {
        const goods = action.payload;

        state.push(...goods);
      },
      prepare(goods: Good[]) {
        goods = goods.map((e) => ({ ...e, id: nanoid() }));

        return {
          payload: goods,
        };
      },
    },
  },
});

export const { ordersAdded } = ordersSlice.actions;

export default ordersSlice.reducer;
