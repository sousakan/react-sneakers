import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Card from '../components/Card';
import Cart from '../components/Cart';
import Store from '../Store';
import Api from '../types/Api';
import Good from '../types/Good';
import cardData from './mock/data';
import getMockedApi from './mock/getMockedApi';

function getApp(cardData: Good, mockedApi: Api): JSX.Element {
  const app = (
    <React.StrictMode>
      <Store api={mockedApi}>
        <>
          <Card card={cardData} />
          <Cart />
        </>
      </Store>
    </React.StrictMode>
  );

  return app;
}

describe('Проверка работы корзины', () => {
  test('При нажатии на кнопку добавления товара в корзину товар появляется в корзине', async () => {
    const good = { ...cardData };

    const mockedApi = getMockedApi([good]);
    const app = getApp(good, mockedApi);

    render(app);

    const card = await screen.findByRole('gridcell');
    const addBtn = within(card).getByTestId('cart-add-button');
    const cart = screen.getByTestId('cart');

    userEvent.click(addBtn);

    const bar = within(cart).getByTestId(String(card.dataset.testid));

    expect(cart).toContainElement(bar);
  });

  test('При нажатии на кнопку удаления товара из корзины товар удаляется из корзины', async () => {
    const good = { ...cardData, isAdded: true };

    const mockedApi = getMockedApi([good]);
    const app = getApp(good, mockedApi);

    render(app);

    const card = await screen.findByRole('gridcell');
    const addBtn = await within(card).findByTestId('cart-add-button');
    const cart = await screen.findByTestId('cart');
    const bar = await within(cart).findByTestId(String(card.dataset.testid));

    userEvent.click(addBtn); // Удаление из корзины

    expect(cart).not.toContainElement(bar);
  });

  test('При нажатии на кнопку карточки корзины удаления товара товар удаляется из корзины', async () => {
    const good = { ...cardData, isAdded: true };

    const mockedApi = getMockedApi([good]);
    const app = getApp(good, mockedApi);

    render(app);

    const cart = await screen.findByTestId('cart');
    const removeBtn = await within(cart).findByTestId('bar-remove-button');
    const bar = await screen.findByRole('listitem');

    userEvent.click(removeBtn); // Удаление из корзины

    expect(cart).not.toContainElement(bar);
  });
});
