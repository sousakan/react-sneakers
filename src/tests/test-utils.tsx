import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { setupStore } from '../app/store';
import config from '../config';
import { rest } from 'msw';
import Good from '../types/Good';

export function renderWithProviders(
  ui: React.ReactElement,
  store = setupStore()
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <React.StrictMode>
        <Provider store={store}>{children}</Provider>
      </React.StrictMode>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper }) };
}

export const getHandlers = (goods: Good[]) => [
  rest.get(`${config.API_URL}/goods`, (req, res, ctx) => {
    return res(ctx.json(goods));
  }),
  rest.put(`${config.API_URL}/goods/:id`, (req, res, ctx) =>
    res(ctx.status(200))
  ),
];
