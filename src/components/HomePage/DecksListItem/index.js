import React from 'react';
import { Link } from '@reach/router';
import styles from './styles.module.scss';

const DeckListItem = ({ id, letter, name }) => {
  return (
    <li className={styles.deckListItem}>
      <Link to={`/decks/${id}`} state={{ id, letter, name }}>
        <span>{letter}</span>
        <p>{name}</p>
      </Link>
    </li>
  );
};

export default DeckListItem;
