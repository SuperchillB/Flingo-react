import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import DeckInfo from '../../components/common/DeckInfo';
import CardCreator from '../../components/common/CardCreator';
import CardsList from '../../components/DeckDetails/CardsList';
import { API_BASE_URL } from '../../constants/apiConstants';
import API from '../../utils/apiUtils';
import axios from 'axios';
import { navigate } from '@reach/router';
import styles from './styles.module.scss';

const DeckDetails = ({ deckId, location }) => {
  const { state, dispatch } = useContext(store);
  console.log('DeckDetails', state);

  const handleDeleteDeck = () => navigate('/');

  const handleSaveCard = () => {
    console.log('handleSaveCard');
  };

  useEffect(() => {
    dispatch({ type: 'LOADING' });
    console.log('useEffect DeckDetails', state, location);
    const currentDeck = state.decks.find((d) => d.id === Number(deckId));
    if (currentDeck.cards && currentDeck.cards.length === 0) {
      // if (currentDeck.cards && currentDeck.cards.length === 0 || location.state.fromCreatePage) {
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
    } else {
      // If cards were already pre-fetched in this deck don't pass in cards in payload
      // This will prevent a new cards load
      dispatch({
        type: 'LOAD_CARDS',
        payload: {
          deckId: Number(deckId),
        },
      });
    }
  }, []);

  return (
    <div className={styles.deckDetails}>
      <header>
        <DeckInfo
          {...state.decks.find((deck) => deck.id === Number(deckId))}
          deckDetailsPage={true}
          onDeleteDeck={handleDeleteDeck}
        />
        <CardCreator deckId={Number(deckId)} onAddCard={handleSaveCard} />
      </header>
      <CardsList
        deck={state.decks.find((deck) => deck.id === Number(deckId))}
      />
    </div>
  );
};

export default DeckDetails;
