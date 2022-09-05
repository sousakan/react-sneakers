import '@testing-library/jest-dom';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Favorites from '../components/Favorites';
import Good from '../types/Good';
import { BrowserRouter as Router } from 'react-router-dom';
import { setupServer } from 'msw/lib/node';
import { getHandlers, renderWithProviders } from './test-utils';
import Goods from '../components/Goods';
import { fetchAllGoods } from '../features/goods/goodsSlice';

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
    name: 'Мужские Кроссовки Nike Blazer Mid Suede',
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

describe('Проверка работы страницы с избранными', () => {
  function getApp(): JSX.Element {
    const app = (
      <Router>
        <Goods />
        <Favorites />
      </Router>
    );

    return app;
  }

  test('При нажатии на кнопку добавления товара в избранные товар появляется на странице с избранными', async () => {
    const good = goods[0];

    const app = getApp();

    const { store } = renderWithProviders(app);

    store.dispatch(fetchAllGoods());

    const grid = await screen.findByRole('grid');
    const homeCard = await within(grid).findByTestId(good.id);
    const addBtn = await within(homeCard).findByTestId('fav-add-button');
    const favContainer = await screen.findByTestId('favorites');

    userEvent.click(addBtn);

    const favCard = await within(favContainer).findByTestId(String(good.id));

    expect(favContainer).toContainElement(favCard);
  });

  test('При нажатии на кнопку удаления товара из избранных товар пропадает со страницы с избранными', async () => {
    const good = goods[2];

    const app = getApp();

    const { store } = renderWithProviders(app);

    store.dispatch(fetchAllGoods());

    const grid = await screen.findByRole('grid');
    const homeCard = await within(grid).findByTestId(good.id);
    const addBtn = await within(homeCard).findByTestId('fav-add-button');
    const favContainer = await screen.findByTestId('favorites');
    const favCard = await within(favContainer).findByTestId(String(good.id));

    userEvent.click(addBtn);

    expect(favContainer).not.toContainElement(favCard);
  });
});
