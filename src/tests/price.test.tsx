import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import React from 'react';
import Cart from '../components/Cart';
import Navigation from '../components/Navigation';
import Store from '../Store';
import Api from '../types/Api';
import cardData from './mock/data';
import getMockedApi from './mock/getMockedApi';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Проверка суммы товаров', () => {
  function getApp(mockedApi: Api): JSX.Element {
    const app = (
      <React.StrictMode>
        <Store api={mockedApi}>
          <Router>
            <Navigation />
            <Cart />
          </Router>
        </Store>
      </React.StrictMode>
    );

    return app;
  }

  test('Суммарная цена за все товары, отображающаяся в разделе навигации, совпадает с суммарной ценой товаров в корзине', async () => {
    // Подготовка

    const good1 = { ...cardData, id: '1', price: 12345, isAdded: true };
    const good2 = { ...cardData, id: '2', price: 25123, isAdded: true };
    const good3 = { ...cardData, id: '3', price: 234, isAdded: true };

    const goods = [good1, good2, good3];

    const mockedApi = getMockedApi(goods);
    const app = getApp(mockedApi);

    render(app);

    const cart = await screen.findByTestId('cart');
    const nav = await screen.findByRole('navigation');

    const cartPrice = await within(cart).findByTestId('total-sum');
    const navPrice = await within(nav).findByTestId('total-sum');

    // Проверка

    expect(cartPrice.textContent).toBe(navPrice.textContent);
  });
});
