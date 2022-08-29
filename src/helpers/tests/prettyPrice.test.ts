import prettyPrice from '../prettyPrice';

describe('Форматирование цены', () => {
  test('0', () => {
    const str = prettyPrice(0);

    expect(str).toBe('0 руб.');
  });

  test('10000', () => {
    const str = prettyPrice(10000);

    expect(str).toBe('10 000 руб.');
  });

  test('999999999', () => {
    const str = prettyPrice(999999999);

    expect(str).toBe('999 999 999 руб.');
  });
});
