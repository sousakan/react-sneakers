export default function calcTax(price: number, taxPercentage = 5): number {
  return Math.ceil((price * taxPercentage) / 100);
}
