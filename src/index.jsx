import React from 'react';
import ReactDOM from 'react-dom/client';
import Store from './Store';
import App from './pages/App';

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>
);
