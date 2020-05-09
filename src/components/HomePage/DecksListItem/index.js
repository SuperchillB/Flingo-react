import React, { useContext } from 'react';
import { Link } from '@reach/router';
import API from '../../../utils/apiUtils';
import { API_BASE_URL } from '../../../constants/apiConstants';
import axios from 'axios';
import CreateIcon from '../../../assets/flingo-icons-plus.svg';
import styles from './styles.module.scss';
import { store } from '../../../store';

const DeckListItem = ({
  id = null,
  letter = '',
  name = '',
  addDeck = false,
}) => {
  const { state, dispatch } = useContext(store);
  const handleDelete = async (e) => {
    e.stopPropagation();
    // Create API instance
    const api = new API({ url: API_BASE_URL.USERDATA[process.env.NODE_ENV] });
    // Create new token for the request
    let source = axios.CancelToken.source(); // TODO: refactor token cancelation inside apiUtils
    try {
      await api.deleteDeck(id, {
        cancelToken: source.token,
      });
      dispatch({
        type: 'DELETE_DECK',
        payload: { deletedDeckId: id },
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

  return (
    <li className={styles.deckListItem}>
      {addDeck ? (
        <Link to="/create" state={{ referral: 'home' }}>
          <span>
            <CreateIcon />
          </span>
          <p>New deck</p>
        </Link>
      ) : (
        <>
          <span onClick={(e) => handleDelete(e)}>x</span>
          <Link to={`/decks/${id}`} state={{ id, letter, name }}>
            <span>{letter}</span>
            <p>{name}</p>
          </Link>
        </>
      )}
    </li>
  );
};

export default DeckListItem;
