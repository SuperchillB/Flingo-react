import React, { useState, useContext } from 'react';
import { store } from '../../../store';
import InputField from '../InputField';
import Button from '../Button';
import API from '../../../utils/apiUtils';
import { API_BASE_URL } from '../../../constants/apiConstants';
import axios from 'axios';
import styles from './styles.module.scss';

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
  const [deckCreated, setDeckCreated] = useState(false);
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
        // Disable 'save' button
        setDeckCreated(true);
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
    <div className={styles.deckInfoContainer}>
      <form className={styles.deckInfo}>
        <div className={styles.deckInfo__logo}>{deckData.letter}</div>
        <div className={styles.deckInfo__inputs}>
          <div>
            <InputField
              classNames="input--line"
              id="deckTitle"
              type="text"
              value={deckData.name}
              placeholder="Deck title"
              onChangeHandler={(e) =>
                setDeckData({ ...deckData, name: e.target.value })
              }
            />
            <InputField
              classNames="input--line"
              id="deckDescription"
              type="textarea"
              value={deckData.description}
              placeholder="Description"
              onChangeHandler={(e) =>
                setDeckData({ ...deckData, description: e.target.value })
              }
            />
            {/* <label className="no-bg" htmlFor="deckTitle">
              <input
                id="deckTitle"
                name="title"
                type="text"
                value={deckData.name}
                placeholder="Deck title"
                onChange={(e) =>
                  setDeckData({ ...deckData, name: e.target.value })
                }
              />
              <span></span>
            </label>
            <label className="no-bg" htmlFor="deckDescription">
              <textarea
                name="deckDescription"
                id="deckDescription"
                value={deckData.description}
                placeholder="Description"
                onChange={(e) =>
                  setDeckData({ ...deckData, description: e.target.value })
                }
              />
              <span></span>
            </label> */}
          </div>
          <div>
            {referral !== 'home' && (
              <Button onClickHandler={(e) => handleHideDropdown(e)}>
                Change deck
              </Button>
              // <button onClick={(e) => handleHideDropdown(e)}>
              //   Change deck
              // </button>
            )}
            <Button
              onClickHandler={(e) => handleSubmit(e)}
              type="submit"
              isDisabled={deckCreated}
              value={id ? 'UPDATE_DECK' : 'ADD_DECK'}
            >
              Save
            </Button>
            {/* <button
              onClick={(e) => handleSubmit(e)}
              type="submit"
              value={id ? 'UPDATE_DECK' : 'ADD_DECK'}
              disabled={deckCreated}
            >
              Save
            </button> */}
            {deckDetailsPage && (
              <Button
                onClickHandler={(e) => handleSubmit(e)}
                type="submit"
                value="DELETE_DECK"
              >
                Delete Deck
              </Button>
              // <button
              //   onClick={(e) => handleSubmit(e)}
              //   type="submit"
              //   value="DELETE_DECK"
              // >
              //   Delete Deck
              // </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeckInfo;
