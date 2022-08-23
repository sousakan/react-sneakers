/**
 *
 * @param goods Массив товаров
 * @return {number} Сумма за все добавленные товары
 */
export default function calcTotalPrice(goods) {
  return goods.filter((e) => e.isAdded).reduce((acc, v) => acc + v.price, 0);
}
