import React, { useContext } from 'react';
import { Router, Link } from '@reach/router';
import { store } from '../store';
import Header from '../components/common/Header';
import HomePage from './HomePage';
import CreatePage from './CreatePage';
import DeckDetails from './DeckDetails';
import QuizPage from './QuizPage';
import ProfilePage from './ProfilePage';

const App = () => {
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
      <Header onSelectLang={selectLangHandler} />
      <Router>
        <HomePage path="/" />
        <DeckDetails path="decks/:deckId" />
        <CreatePage path="/create" />
        <QuizPage path="/quiz" />
        <ProfilePage path="/profile" />
      </Router>
    </React.StrictMode>
  );
};

export default App;
