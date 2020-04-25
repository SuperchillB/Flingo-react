import React, { useContext } from 'react';
import { Link } from '@reach/router';
import DeckListItem from './DeckListItem';
import { store } from '../../store';

const DecksList = () => {
  const { state } = useContext(store);

  return (
    <ul>
      <li>
        <Link to="/create" state={{ referral: 'home' }}>
          New deck
        </Link>
      </li>
      {state.decks.map((deck) => (
        <DeckListItem key={deck.id} {...deck} />
      ))}
    </ul>
  );
};

export default DecksList;
