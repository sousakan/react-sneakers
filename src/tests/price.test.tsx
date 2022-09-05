import '@testing-library/jest-dom';
import { screen, within } from '@testing-library/react';
import Cart from '../components/Cart';
import Navigation from '../components/Navigation';
import { BrowserRouter as Router } from 'react-router-dom';
import { setupServer } from 'msw/lib/node';
import { getHandlers, renderWithProviders } from './test-utils';
import { fetchAllGoods } from '../features/goods/goodsSlice';
import Good from '../types/Good';

const goods: Good[] = [
  {
    id: '1',
    name: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 12345,
    isLiked: false,
    isAdded: false,
    url: './images/goods/1.png',
  },
  {
    id: '2',
    name: 'Мужские Кроссовки Nike Air Max 270',
    price: 25123,
    isLiked: false,
    isAdded: true,
    url: './images/goods/2.png',
  },
  {
    id: '3',
    name: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 234,
    isLiked: true,
    isAdded: false,
    url: './images/goods/3.png',
  },
];

const server = setupServer(...getHandlers(goods));

beforeAll(() => server.listen());

afterEach(() => server.restoreHandlers());

afterAll(() => server.close());

describe('Проверка суммы товаров', () => {
  function getApp(): JSX.Element {
    const app = (
      <Router>
        <Navigation />
        <Cart />
      </Router>
    );

    return app;
  }

  test('Суммарная цена за все товары, отображающаяся в разделе навигации, совпадает с суммарной ценой товаров в корзине', async () => {
    const app = getApp();

    const { store } = renderWithProviders(app);

    store.dispatch(fetchAllGoods());

    const cart = await screen.findByTestId('cart');
    const nav = await screen.findByRole('navigation');

    const cartPrice = await within(cart).findByTestId('total-sum');
    const navPrice = await within(nav).findByTestId('total-sum');

    expect(cartPrice.textContent).toBe(navPrice.textContent);
  });
});
