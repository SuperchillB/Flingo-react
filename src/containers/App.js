import React, { useContext, createContext, useState } from 'react';
import { Router } from '@reach/router';
import { store } from '../store';
import Blob from '../components/common/Blob';
import Logo from '../components/common/Logo';
import NavBar from '../components/common/Navbar';
import HomePage from './HomePage';
import CreatePage from './CreatePage';
import DeckDetails from './DeckDetails';
import CardDetails from './CardDetails';
import QuizPage from './QuizPage';
import ProfilePage from './ProfilePage';
import { Modal } from '../components/common/Modal';
import { useBreakpoint } from './BreakpointProvider';
import { ModalProvider } from '../components/common/Modal';

const deckState = createContext(null);
const { Provider } = deckState;

const DeckStateProvider = ({ children }) => {
  const [deckContext, setDeckContext] = useState({
    editMode: false,
    selectedCards: [],
    selfTestModeActive: false,
    selfTestModeHideLeft: false,
  });
  const updateContext = (prop, value) => {
    console.log('UPDATECONTEXT', prop, value);
    setDeckContext((prevContext) => ({ ...prevContext, [prop]: value }));
  };

  return <Provider value={{ deckContext, updateContext }}>{children}</Provider>;
};

const App = () => {
  const { currMatch } = useBreakpoint();
  const { state, dispatch } = useContext(store);
  const selectLangHandler = (e) => {
    dispatch({
      type: 'CHANGE_LANGUAGE',
      payload: {
        lang: e.target.value,
      },
    });
  };

  return (
    <React.StrictMode>
      <ModalProvider>
        <DeckStateProvider>
          <Blob />
          {currMatch === 'xs' && <Logo />}
          <NavBar onSelectLang={selectLangHandler} />

          <Router>
            <HomePage path="/" />
            <DeckDetails path="decks/:deckId" />
            <CardDetails path="cards/:cardId" />
            <CreatePage path="/create" />
            <QuizPage path="/quiz" />
            <ProfilePage path="/profile" />
          </Router>
        </DeckStateProvider>
      </ModalProvider>
    </React.StrictMode>
  );
};

export { App, deckState };
