import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/app';
import { store } from './store';

// eslint-disable-next-line no-undef
const root = document.getElementById('root');
const rootContainer = createRoot(root);

rootContainer.render(
  <Provider store={store}>
    <App />
  </Provider>
);
