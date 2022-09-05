import { Provider } from 'react-redux';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import { setupStore } from './app/store';
import { fetchAllGoods } from './features/goods/goodsSlice';

const store = setupStore();

store.dispatch(fetchAllGoods());

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
