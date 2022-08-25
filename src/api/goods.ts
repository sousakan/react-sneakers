import Good from '../types/Good';
import axios from './axios';

const goodsURL = 'goods';

export const getAll = () => axios.get<Good[]>(goodsURL);
export const update = (good: Good) => axios.put(`${goodsURL}/${good.id}`, good);
