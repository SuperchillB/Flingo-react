import React, { useContext } from 'react';
import {
  Router,
  Link,
  LocationProvider,
  createHistory,
  createMemorySource,
  globalHistory,
} from '@reach/router';
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

  // // for some types of tests you want a memory source
  // let source = createMemorySource('/');
  // let history = createHistory(source);

  // history.listen((data) => {
  //   console.log(data);
  // });

  // globalHistory.listen((data) => {
  //   console.log(data);
  // });

  return (
    <React.StrictMode>
      <Blob />
      {currMatch === 'xs' && <Logo />}
      <NavBar onSelectLang={selectLangHandler} />
      {/* <LocationProvider history={history}> */}
      <Router>
        <HomePage path="/" />
        <DeckDetails path="decks/:deckId" />
        <CardDetails path="cards/:cardId" />
        <CreatePage path="/create" />
        <QuizPage path="/quiz" />
        <ProfilePage path="/profile" />
      </Router>
      {/* </LocationProvider> */}
    </React.StrictMode>
  );
};

export default App;
