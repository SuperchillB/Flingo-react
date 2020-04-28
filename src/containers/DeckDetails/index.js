import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import DeckInfo from '../../components/common/DeckInfo';
import CardCreator from '../../components/common/CardCreator';
import CardsList from '../../components/DeckDetails/CardsList';
import { API_BASE_URL } from '../../constants/apiConstants';
import API from '../../utils/apiUtils';
import axios from 'axios';

const DeckDetails = ({ deckId, location }) => {
  const { state, dispatch } = useContext(store);
  console.log('DeckDetails', state);

  const handleSaveCard = () => {
    console.log('handleSaveCard');
  };

  useEffect(() => {
    dispatch({ type: 'LOADING' });
    console.log('useEffect DeckDetails', state);
    // Create API instance
    const api = new API({ url: API_BASE_URL.USERDATA[process.env.NODE_ENV] });
    // Create new token for the request
    let source = axios.CancelToken.source(); // TODO: refactor token cancelation inside apiUtils

    const fetchDecks = async () => {
      // TODO: refactor async/await inside apiUtils
      try {
        const response = await api.getCardsInDeck(Number(deckId), {
          cancelToken: source.token,
        });
        dispatch({
          type: 'LOAD_CARDS',
          payload: {
            cards: response.data,
            deckId: Number(deckId),
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
  }, []);

  return (
    <div>
      <div>
        <DeckInfo {...state.decks.find((deck) => deck.id === Number(deckId))} />
        <CardCreator deckId={Number(deckId)} onAddCard={handleSaveCard} />
      </div>
      <CardsList
        deck={state.decks.find((deck) => deck.id === Number(deckId))}
      />
      <h1>Deck id: {deckId}</h1>
      <ul>
        <li>ID: {location.state.id}</li>
        <li>Letter: {location.state.letter}</li>
        <li>Name: {location.state.name}</li>
      </ul>
    </div>
  );
};

export default DeckDetails;
