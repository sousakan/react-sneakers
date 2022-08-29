import calcTax from '../calcTax';

describe('Сумма налога от стоимости и процента налога', () => {
  test('Сумма: 100, %: 5', () => {
    const price = 100;
    const tax = calcTax(price);

    expect(tax).toBe(5);
  });

  test('Сумма: 199, %: 15', () => {
    const price = 199;
    const taxPercentage = 15;
    const tax = calcTax(price, taxPercentage);

    expect(tax).toBe(30);
  });

  test('Сумма: 0, %: 15', () => {
    const price = 0;
    const taxPercentage = 15;
    const tax = calcTax(price, taxPercentage);

    expect(tax).toBe(0);
  });
});
