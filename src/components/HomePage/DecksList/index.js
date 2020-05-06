import React, { useContext } from 'react';
import { Link } from '@reach/router';
import DeckListItem from '../DecksListItem';
import { store } from '../../../store';
import styles from './styles.module.scss';

const DecksList = () => {
  const { state } = useContext(store);

  return (
    <ul className={styles.deckList}>
      <DeckListItem addDeck={true} />
      {state.decks.map((deck) => (
        <DeckListItem key={deck.id} {...deck} />
      ))}
    </ul>
  );
};

export default DecksList;
