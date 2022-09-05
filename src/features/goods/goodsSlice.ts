import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import api from '../../api';
import { RootState } from '../../app/store';
import Good from '../../types/Good';

const initialState: Good[] = [];

export const fetchAllGoods = createAsyncThunk(
  'goods/fetchAllGoods',
  async () => {
    const goods = await api.goods.getAll();

    return goods;
  }
);

const createAsyncThunkF = (typePrefix: string) =>
  createAsyncThunk<void, string, { state: RootState }>(
    typePrefix,
    async (id, { getState }) => {
      const good = selectGoodById(getState(), id);

      if (good) {
        await api.goods.update(good);
      }
    }
  );

export const goodAddedToCart = createAsyncThunkF('goods/goodAddedToCart');
export const goodRemovedFromCart = createAsyncThunkF(
  'goods/goodRemovedFromCart'
);
export const goodAddedToLiked = createAsyncThunkF('goods/goodAddedToLiked');
export const goodRemovedFromLiked = createAsyncThunkF(
  'goods/goodRemovedFromLiked'
);

export const goodsRemovedFromCart = createAsyncThunk<
  void,
  Good[],
  { state: RootState }
>('goods/goodsRemovedFromCart', async (goods, { dispatch }) => {
  goods.forEach((e) => dispatch(goodRemovedFromCart(e.id)));
});

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllGoods.fulfilled, (state, action) => {
      return action.payload;
    });

    builder
      .addCase(goodAddedToCart.pending, (state, action) => {
        const goodId = action.meta.arg;
        const good = state.find((e) => e.id === goodId);

        if (good) {
          good.isAdded = true;
        }
      })
      .addCase(goodAddedToCart.rejected, (state, action) => {
        const goodId = action.meta.arg;
        const good = state.find((e) => e.id === goodId);

        if (good) {
          good.isAdded = false;
        }
      });

    builder
      .addCase(goodRemovedFromCart.pending, (state, action) => {
        const goodId = action.meta.arg;
        const good = state.find((e) => e.id === goodId);

        if (good) {
          good.isAdded = false;
        }
      })
      .addCase(goodRemovedFromCart.rejected, (state, action) => {
        const goodId = action.meta.arg;
        const good = state.find((e) => e.id === goodId);

        if (good) {
          good.isAdded = true;
        }
      });

    builder
      .addCase(goodAddedToLiked.pending, (state, action) => {
        const goodId = action.meta.arg;
        const good = state.find((e) => e.id === goodId);

        if (good) {
          good.isLiked = true;
        }
      })
      .addCase(goodAddedToLiked.rejected, (state, action) => {
        const goodId = action.meta.arg;
        const good = state.find((e) => e.id === goodId);

        if (good) {
          good.isLiked = false;
        }
      });

    builder
      .addCase(goodRemovedFromLiked.pending, (state, action) => {
        const goodId = action.meta.arg;
        const good = state.find((e) => e.id === goodId);

        if (good) {
          good.isLiked = false;
        }
      })
      .addCase(goodRemovedFromLiked.rejected, (state, action) => {
        const goodId = action.meta.arg;
        const good = state.find((e) => e.id === goodId);

        if (good) {
          good.isLiked = true;
        }
      });
  },
});

export const selectAllGoods = (state: RootState) => state.goods;

export const selectGoodById = (state: RootState, id: string) =>
  state.goods.find((e) => e.id === id);

export const selectGoodsInCart = createSelector(selectAllGoods, (goods) =>
  goods.filter((e) => e.isAdded)
);

export const selectLikedGoods = createSelector(selectAllGoods, (goods) =>
  goods.filter((e) => e.isLiked)
);

export default goodsSlice.reducer;
