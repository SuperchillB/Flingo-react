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
  onDeleteDeck = () => {},
  referral = 'home',
  deckDetailsPage = false,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const actionType = e.target.value;
    // TODO: Add some sanitisation/validation rules
    if (actionType === 'DELETE_DECK') {
      makeDeckRequest(actionType);
    } else {
      if (deckData.name !== '') makeDeckRequest(actionType);
    }
  };

  const handleSaveDeck = () => {
    if (deckData.name !== '') {
      if (id) {
        // ! if existing id => = existing deck => putDeck or patchDeck
        console.log('id exists');
        makeDeckRequest('PUT', 'UPDATE_DECK');
      } else {
        // ! if no existing id => = new deck => postDeck
        console.log('id doesnt exists');
        makeDeckRequest('POST', 'ADD_DECK');
      }
    }
  };

  const handleDeleteDeck = () => makeDeckRequest('DELETE', 'DELETE_DECK');

  const makeDeckRequest = async (actionType) => {
    // Create API instance
    const api = new API({ url: API_BASE_URL.USERDATA[process.env.NODE_ENV] });
    // Create new token for the request
    let source = axios.CancelToken.source(); // TODO: refactor token cancelation inside apiUtils
    try {
      let response;
      let data;
      let payload;
      // Prepare config for API request method
      const config = {
        cancelToken: source.token,
        headers: { 'Content-Type': 'application/json' },
      };
      // POST
      if (actionType === 'ADD_DECK') {
        response = await api.postDeck(
          JSON.stringify({
            name: deckData.name,
            description: deckData.description,
            languageId: [state.user.targetLang.id],
          }),
          config,
        );
        // Add cards property for global state
        data = {
          ...response.data,
          cards: [],
        };
        // Payload in dispatch functino
        payload = { deck: data };
      }
      // PUT
      if (actionType === 'UPDATE_DECK') {
        response = await api.putDeck(
          JSON.stringify({
            id: deckData.id,
            name: deckData.name,
            description: deckData.description,
            languageId: [state.user.targetLang.id],
          }),
          config,
        );
        // Don't add empty cards property here or else existing cards will be gone
        data = { ...response.data };
        // Payload in dispatch functino
        payload = { deck: data };
      }
      // DELETE
      if (actionType === 'DELETE_DECK') {
        response = await api.deleteDeck(id, {
          cancelToken: source.token,
        });
        payload = { deletedDeckId: id };
      }
      // Dispatch to reducer
      // dispatch({
      //   type: action,
      //   payload: {
      //     deck: data,
      //   },
      // });
      dispatch({
        type: actionType,
        payload,
      });
      // Tell parent new deck is created so CardCreator can enable card creation
      // ? ONLY FOR POST? OR FOR PUT TOO?
      if (actionType === 'ADD_DECK') onSaveDeck(data.id);
      if (actionType === 'DELETE_DECK') onDeleteDeck();
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
    <form>
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
        <button
          onClick={(e) => handleSubmit(e)}
          type="submit"
          value={id ? 'UPDATE_DECK' : 'ADD_DECK'}
        >
          Save
        </button>
        {deckDetailsPage && (
          <button
            onClick={(e) => handleSubmit(e)}
            type="submit"
            value="DELETE_DECK"
          >
            Delete Deck
          </button>
        )}
      </div>
    </form>
  );
};

export default DeckInfo;
