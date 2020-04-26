import React, { useState, useContext, useEffect } from 'react';
import { Link } from '@reach/router';
import { store } from '../../store';
import DecksList from '../../components/HomePage/DecksList';
import API from '../../utils/apiUtils';
import { API_BASE_URL, GET_DECKS_IN_LANG } from '../../constants/apiConstants';
import axios from 'axios';
// import useApi from '../../utils/customHooks/useApi'; // ! TEST

const HomePage = () => {
  const { state, dispatch } = useContext(store);
  const [isAuth, setIsAuth] = useState(true);
  // const [state, dispatch] = useApi(GET_DECKS_IN_LANG, {}, []); // ! TEST

  useEffect(() => {
    dispatch({ type: 'LOADING' });
    console.log('useEffect HomePage', state);
    // if (state.decks.length === 0) {
    // Create API instance
    const api = new API({ url: API_BASE_URL.USERDATA[process.env.NODE_ENV] });
    // Create new token for the request
    let source = axios.CancelToken.source(); // TODO: refactor token cancelation inside apiUtils

    const fetchDecks = async () => {
      // TODO: refactor async/await inside apiUtils
      try {
        const response = await api.getDecksInLang(state.currentTargetLang.id, {
          cancelToken: source.token,
        });
        // setState(state => (
        // 	{ ...state, decks: response.data }
        // ));
        // setDecks(response.data);
        // TODO: refactor properties inside each deck ("letter" vs "logo", "description", ...)
        const data = response.data.map((el) => ({
          ...el,
          letter: el.name[0].toUpperCase(),
          cards: [],
        }));
        dispatch({
          type: 'LOAD_DECKS',
          payload: {
            decks: data,
          },
        });
      } catch (error) {
        dispatch({
          type: 'ERROR',
          payload: { error },
        });
        if (!axios.isCancel(error)) {
          throw error;
        }
      }
    };
    fetchDecks();
    // when unmounting component, cancel axios token
    return () => {
      source.cancel();
    };
    // }
  }, [state.currentTargetLang]);

  return (
    <div>
      {isAuth ? (
        <div>
          <h1>Deck list</h1>
          {state.loading ? <p>Loading ...</p> : <DecksList />}
        </div>
      ) : (
        <div>
          <h2>You currently have no decks</h2>
          <Link to="/create/new-deck">New deck</Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;