import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Card from '../components/Card';
import Favorites from '../components/Favorites';
import Store from '../Store';
import Api from '../types/Api';
import Good from '../types/Good';
import cardData from './mock/data';
import getMockedApi from './mock/getMockedApi';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Проверка работы страницы с избранными', () => {
  function getApp(cardData: Good, mockedApi: Api): JSX.Element {
    const app = (
      <React.StrictMode>
        <Store api={mockedApi}>
          <Router>
            <Card card={cardData} />
            <Favorites />
          </Router>
        </Store>
      </React.StrictMode>
    );

    return app;
  }

  test('При нажатии на кнопку добавления товара в избранные товар появляется на странице с избранными', async () => {
    const good = { ...cardData };

    const mockedApi = getMockedApi([good]);
    const app = getApp(good, mockedApi);

    render(app);

    const homeCard = await screen.findByRole('gridcell');
    const addBtn = await within(homeCard).findByTestId('fav-add-button');
    const favContainer = await screen.findByTestId('favorites');

    userEvent.click(addBtn);

    const favCard = await within(favContainer).findByTestId(
      String(homeCard.dataset.testid)
    );

    expect(favContainer).toContainElement(favCard);
  });

  test('При нажатии на кнопку удаления товара из избранных товар пропадает со страницы с избранными', async () => {
    const good = { ...cardData, isLiked: true };

    const mockedApi = getMockedApi([good]);
    const app = getApp(good, mockedApi);

    render(app);

    const homeCard = await screen.findByRole('gridcell');
    const addBtn = await within(homeCard).findByTestId('fav-add-button');
    const favContainer = await screen.findByTestId('favorites');
    const favCard = await within(favContainer).findByTestId(
      String(homeCard.dataset.testid)
    );

    userEvent.click(addBtn);

    expect(favContainer).not.toContainElement(favCard);
  });
});
