import React, { useState, useContext } from 'react';
import { store } from '../../store';
import API from '../../utils/apiUtils';
import { API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios';

const DeckInfo = ({
  id = null,
  letter = '',
  name = '',
  description = '',
  onHideDropdown = () => {},
  onSaveDeck = () => {},
  referral = 'home',
}) => {
  const { state, dispatch } = useContext(store);
  const [deckData, setDeckData] = useState({
    id,
    name,
    letter,
    description,
    languageId: state.user.targetLang.id,
  });
  const handleHideDropdown = (e) => onHideDropdown(e);

  console.log('DeckInfo', {
    id,
    name,
    description,
    onHideDropdown,
  });

  const handleSaveDeck = () => {
    if (deckData.name !== '') {
      if (id) {
        // ! if existing id => = existing deck => putDeck or patchDeck
        console.log('id exists');
        saveDeck('PUT', 'UPDATE_DECK');
      } else {
        // ! if no existing id => = new deck => postDeck
        console.log('id doesnt exists');
        saveDeck('POST', 'ADD_DECK');
      }
    }
  };

  const saveDeck = async (method, action) => {
    // Prepare JSON data to post/put
    const deckDetails = JSON.stringify({
      name: deckData.name,
      description: deckData.description,
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
        response = await api.postDeck(deckDetails, payload);
      if (method === 'PUT') response = await api.putDeck(deckDetails, payload);
      // Add cards property for global state
      const data = {
        ...response.data,
        cards: [],
      };
      // Dispatch to reducer
      dispatch({
        type: action,
        payload: {
          deck: data,
        },
      });
      // Tell parent new deck is created so CardCreator can enable card creation
      // ? ONLY FOR POST? OR FOR PUT TOO?
      if (method === 'POST') onSaveDeck(data.id);
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
  // // when unmounting component, cancel axios token
  // return () => {
  //   source.cancel();
  // };

  return (
    <div>
      <div>{deckData.letter}</div>
      <div>
        <label htmlFor="deckTitle">
          <input
            id="deckTitle"
            name="title"
            type="text"
            value={deckData.name}
            placeholder="Title"
            onChange={(e) => setDeckData({ ...deckData, name: e.target.value })}
          />
        </label>
        <label htmlFor="deckDescription">
          <textarea
            name="deckDescription"
            id="deckDescription"
            cols="30"
            rows="5"
            value={deckData.description}
            placeholder="Description"
            onChange={(e) =>
              setDeckData({ ...deckData, description: e.target.value })
            }
          />
        </label>
      </div>
      <div>
        {referral !== 'home' && (
          <button onClick={(e) => handleHideDropdown(e)}>
            Change deck (back btn)
          </button>
        )}
        <button onClick={handleSaveDeck}>Save</button>
      </div>
    </div>
  );
};

export default DeckInfo;
