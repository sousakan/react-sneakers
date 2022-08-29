import Good from '../../types/Good';
import calcTotalPrice from '../calcTotalPrice';

const cardData: Good = {
  id: '1',
  name: 'Мужские Кроссовки Nike Blazer Mid Suede',
  price: 12999,
  isLiked: false,
  isAdded: true,
  url: './images/goods/1.png',
};

describe('Суммарная стоимость добавленных товаров', () => {
  test('1 товар', () => {
    const good1 = { ...cardData, price: 999 };

    const totalPrice = calcTotalPrice([good1]);

    expect(totalPrice).toBe(999);
  });

  test('2 товара', () => {
    const good1 = { ...cardData, price: 100 };
    const good2 = { ...cardData, price: 15 };

    const totalPrice = calcTotalPrice([good1, good2]);

    expect(totalPrice).toBe(115);
  });
});
