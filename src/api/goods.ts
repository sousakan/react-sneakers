import Good from '../types/Good';
import axios from './axios';

const goodsURL = 'goods';

export const getAll = async (): Promise<Good[]> => {
  const { data: goods } = await axios.get<Good[]>(goodsURL);

  return goods;
};
export const update = async (good: Good): Promise<void> =>
  axios.put(`${goodsURL}/${good.id}`, good);
