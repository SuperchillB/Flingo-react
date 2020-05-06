import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';
import { store, StateProvider } from './store';
import { BreakpointProvider } from './containers/BreakpointProvider';
import { mediaQueries } from './styles/breakpoints';

render(
  <BreakpointProvider queries={mediaQueries}>
    <StateProvider>
      <App />
    </StateProvider>
  </BreakpointProvider>,
  document.getElementById('root'),
);
