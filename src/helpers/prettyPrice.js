/**
 *
 * @param {number} number
 * @returns {string} Число в виде xx xxx руб.
 */
export default function prettyPrice(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' руб.';
}
