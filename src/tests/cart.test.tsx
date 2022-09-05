import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { screen, within } from '@testing-library/react';
import { getHandlers, renderWithProviders } from './test-utils';
import userEvent from '@testing-library/user-event';
import Cart from '../components/Cart';
import Goods from '../components/Goods';
import { fetchAllGoods } from '../features/goods/goodsSlice';
import Good from '../types/Good';

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
];

const server = setupServer(...getHandlers(goods));

beforeAll(() => server.listen());

afterEach(() => server.restoreHandlers());

afterAll(() => server.close());

function getApp(): JSX.Element {
  const app = (
    <>
      <Goods />
      <Cart />
    </>
  );

  return app;
}

describe('Проверка работы корзины', () => {
  test('При нажатии на кнопку добавления товара в корзину товар появляется в корзине', async () => {
    const good = goods[0];

    const app = getApp();

    const { store } = renderWithProviders(app);

    store.dispatch(fetchAllGoods());

    const grid = await screen.findByRole('grid');
    const card = await within(grid).findByTestId(good.id);
    const addBtn = await within(card).findByTestId('cart-add-button');
    const cart = await screen.findByTestId('cart');

    userEvent.click(addBtn);

    const bar = await within(cart).findByTestId(String(card.dataset.testid));

    expect(cart).toContainElement(bar);
  });

  test('При нажатии на кнопку удаления товара из корзины товар удаляется из корзины', async () => {
    const good = goods[1];

    const app = getApp();

    const { store } = renderWithProviders(app);

    store.dispatch(fetchAllGoods());

    const grid = await screen.findByRole('grid');
    const card = await within(grid).findByTestId(good.id);
    const addBtn = await within(card).findByTestId('cart-add-button');
    const cart = await screen.findByTestId('cart');
    const bar = await within(cart).findByTestId(String(card.dataset.testid));

    userEvent.click(addBtn); // Удаление из корзины

    expect(cart).not.toContainElement(bar);
  });

  test('При нажатии на кнопку карточки корзины удаления товара товар удаляется из корзины', async () => {
    const good = goods[1];

    const app = getApp();

    const { store } = renderWithProviders(app);

    store.dispatch(fetchAllGoods());

    const cart = await screen.findByTestId('cart');
    const bar = await within(cart).findByTestId(good.id);
    const removeBtn = await within(bar).findByTestId('bar-remove-button');

    userEvent.click(removeBtn); // Удаление из корзины

    expect(cart).not.toContainElement(bar);
  });
});
