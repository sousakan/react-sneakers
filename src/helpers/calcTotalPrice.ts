import Good from '../types/Good';

export default function calcTotalPrice(goods: Good[]): number {
  return goods.filter((e) => e.isAdded).reduce((acc, v) => acc + v.price, 0);
}
