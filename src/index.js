import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';
import { store, StateProvider } from './store';

render(
  <StateProvider>
    <App />
  </StateProvider>,
  document.getElementById('root'),
);
