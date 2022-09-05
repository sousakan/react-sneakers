import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/lib/node';
import Goods from '../components/Goods';
import { fetchAllGoods } from '../features/goods/goodsSlice';
import Good from '../types/Good';
import { getHandlers, renderWithProviders } from './test-utils';

const goods: Good[] = [
  {
    id: '1',
    name: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 12999,
    isLiked: false,
    isAdded: false,
    url: './images/goods/1.png',
  },
  {
    id: '2',
    name: 'Мужские Кроссовки Nike Air Max 270',
    price: 12999,
    isLiked: false,
    isAdded: true,
    url: './images/goods/2.png',
  },
  {
    id: '3',
    name: 'Мужские Кроссовки Jordan Air Jordan 11',
    price: 8499,
    isLiked: true,
    isAdded: false,
    url: './images/goods/3.png',
  },
];

const server = setupServer(...getHandlers(goods));

beforeAll(() => server.listen());

afterEach(() => server.restoreHandlers());

afterAll(() => server.close());

describe('Проверка фильтрации товаров', () => {
  function getApp(): JSX.Element {
    const app = <Goods />;

    return app;
  }

  test('При вводе ключевых слов в поисковую строку остаются только товары, содержащие данное ключевое слово в названии', async () => {
    const app = getApp();

    const { store } = renderWithProviders(app);

    store.dispatch(fetchAllGoods());

    const search = await screen.findByRole('search');

    userEvent.type(search, 'Nike');

    const filteredGoods = await screen.findAllByRole('gridcell');
    expect(filteredGoods.length).toBe(2);
  });
});
