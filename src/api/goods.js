import axios from './axios';

const goodsURL = 'goods';

export const getAll = () => axios.get(goodsURL);
export const update = (good) => axios.put(`${goodsURL}/${good.id}`, good);
