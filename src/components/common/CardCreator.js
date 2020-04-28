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
    saveCard('POST', 'ADD_CARD');
    // Empty input fields
    setFromText('');
    setToText('');
    setNotes('');
  };

  // TODO: REMOVE PUT IF ONLY POST IS POSSIBLE HERE
  const saveCard = async (method, action) => {
    // Prepare JSON data to post/put
    const cardDetails = JSON.stringify({
      from: fromText,
      fromLang: state.user.defaultLang.id,
      to: toText,
      toLang: state.user.targetLang.id,
      deckId: [deckId],
      languageId: [state.user.targetLang.id],
    });
    // Create API instance
    const api = new API({ url: API_BASE_URL.USERDATA[process.env.NODE_ENV] });
    // Create new token for the request
    let source = axios.CancelToken.source(); // TODO: refactor token cancelation inside apiUtils
    try {
      let response;
      // Prepare payload for API request method
      const payload = {
        cancelToken: source.token,
        headers: { 'Content-Type': 'application/json' },
      };
      // POST or PUT
      if (method === 'POST')
        response = await api.postCard(cardDetails, payload);
      if (method === 'PUT') response = await api.putCard(cardDetails, payload);
      // // Add cards property for global state
      // const data = {
      //   ...response.data,
      //   cards: [],
      // };
      // Dispatch to reducer
      dispatch({
        type: action,
        payload: {
          card: response.data,
        },
      });
      // Tell parent new card is created to trigger re-navigation
      if (method === 'POST') onAddCard();
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
