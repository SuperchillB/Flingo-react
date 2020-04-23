import React, { createContext, useReducer } from 'react';
import storeReducer from './storeReducer';
import initialState from './initialState';

// const store = createContext(initialState);
const store = createContext();
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
