import React, { useState, useContext } from 'react';
import { store } from '../../store';
import API from '../../utils/apiUtils';
import { API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios';

const CardCreator = ({ deckId = null, onAddCard }) => {
  const { state, dispatch } = useContext(store);
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    saveCard();
    // Empty input fields
    setFromText('');
    setToText('');
    setNotes('');
  };

  const saveCard = async () => {
    // Create API instance
    const api = new API({ url: API_BASE_URL.USERDATA[process.env.NODE_ENV] });
    // Create new token for the request
    let source = axios.CancelToken.source(); // TODO: refactor token cancelation inside apiUtils
    try {
      const response = await api.postCard(
        JSON.stringify({
          from: fromText,
          fromLang: state.user.defaultLang.id,
          to: toText,
          toLang: state.user.targetLang.id,
          deckId: [deckId],
          languageId: [state.user.targetLang.id],
        }),
        {
          cancelToken: source.token,
          headers: { 'Content-Type': 'application/json' },
        },
      );
      // If we're creating card from DeckDetails page or the containing deck was already pre-loaded
      if (
        window.location.pathname.includes('/decks/') ||
        state.decks.find((d) => d.id === deckId).cards.length > 0
      ) {
        // Dispatch to reducer
        dispatch({
          type: 'ADD_CARD',
          payload: {
            card: response.data,
          },
        });
      }
      // Tell parent new card is created to trigger re-navigation
      onAddCard();
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

  return (
    <div>
      <form>
        <div>
          <div>
            <label htmlFor="translateFrom">
              <input
                id="translateFrom"
                type="text"
                value={fromText}
                placeholder="From"
                onChange={(e) => setFromText(e.target.value)}
              />
            </label>
            <label htmlFor="translateTo">
              <input
                id="translateTo"
                type="text"
                value={toText}
                placeholder="To"
                onChange={(e) => setToText(e.target.value)}
              />
            </label>
          </div>
          <div></div>
        </div>
        <div>
          <textarea
            name="cardNotes"
            id="cardNotes"
            cols="30"
            rows="10"
            value={notes}
            placeholder="Notes"
            onChange={(e) => setNotes(e.target.value)}
          />
          <button
            onClick={(e) => handleSubmit(e)}
            type="submit"
            disabled={!deckId}
          >
            Add Card
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardCreator;
