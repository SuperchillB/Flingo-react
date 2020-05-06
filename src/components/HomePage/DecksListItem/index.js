import React from 'react';
import { Link } from '@reach/router';
import CreateIcon from '../../../assets/flingo-icons-plus.svg';
import styles from './styles.module.scss';

const DeckListItem = ({
  id = null,
  letter = '',
  name = '',
  addDeck = false,
}) => {
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
        <Link to={`/decks/${id}`} state={{ id, letter, name }}>
          <span>{letter}</span>
          <p>{name}</p>
        </Link>
      )}
    </li>
  );
};

export default DeckListItem;
