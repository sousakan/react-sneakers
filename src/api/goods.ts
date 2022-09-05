import Good from '../types/Good';
import axios from './axios';

export const getAll = async (): Promise<Good[]> => {
  const { data: goods } = await axios.get<Good[]>('goods');

  return goods;
};
export const update = async (good: Good): Promise<void> =>
  axios.put(`goods/${good.id}`, good);
