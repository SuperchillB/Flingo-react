import React, { useContext } from 'react';
import { Router, Link } from '@reach/router';
import { store } from '../store';
import Logo from '../components/common/Logo';
import NavBar from '../components/common/Navbar';
import HomePage from './HomePage';
import CreatePage from './CreatePage';
import DeckDetails from './DeckDetails';
import CardDetails from './CardDetails';
import QuizPage from './QuizPage';
import ProfilePage from './ProfilePage';
import { useBreakpoint } from './BreakpointProvider';

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
      {currMatch === 'xs' && <Logo />}
      <NavBar onSelectLang={selectLangHandler} />
      <Router>
        <HomePage path="/" />
        <DeckDetails path="decks/:deckId" />
        <CardDetails path="cards/:cardId" />
        <CardDetails path="cards/new-card" />
        <CreatePage path="/create" />
        <QuizPage path="/quiz" />
        <ProfilePage path="/profile" />
      </Router>
    </React.StrictMode>
  );
};

export default App;
