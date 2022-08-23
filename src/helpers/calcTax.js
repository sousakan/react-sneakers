/**
 * @param {number} price
 * @param {number} taxPercentage
 * @return {number} Налог
 */
export default function calcTax(price, taxPercentage = 5) {
  return Math.ceil((price * taxPercentage) / 100);
}
