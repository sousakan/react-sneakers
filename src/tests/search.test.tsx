import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Goods from '../components/Goods';
import Store from '../Store';
import Api from '../types/Api';
import Good from '../types/Good';
import cardData from './mock/data';
import getMockedApi from './mock/getMockedApi';

describe('Проверка фильтрации товаров', () => {
  function getApp(goods: Good[], mockedApi: Api): JSX.Element {
    const app = (
      <React.StrictMode>
        <Store api={mockedApi}>
          <Goods />
        </Store>
      </React.StrictMode>
    );

    return app;
  }

  test('При вводе ключевых слов в поисковую строку остаются только товары, содержащие данное ключевое слово в названии', async () => {
    // Подготовка

    const good1 = {
      ...cardData,
      id: '1',
      name: 'Мужские Кроссовки Nike Blazer Mid Suede',
    };
    const good2 = {
      ...cardData,
      id: '2',
      name: 'Мужские Кроссовки Nike Air Max 270',
    };
    const good3 = {
      ...cardData,
      id: '3',
      name: 'Мужские Кроссовки Jordan Air Jordan 11',
    };

    const goods = [good1, good2, good3];

    const mockedApi = getMockedApi(goods);
    const app = getApp(goods, mockedApi);

    render(app);

    const search = await screen.findByRole('search');

    // Действие

    userEvent.type(search, 'Nike');

    // Проверка

    const filteredGoods = await screen.findAllByRole('gridcell');
    expect(filteredGoods.length).toBe(2);
  });
});
