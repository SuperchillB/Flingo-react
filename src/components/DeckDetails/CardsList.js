import React, { useState, useContext } from 'react';
import CardListItem from './CardListItem';
import { store } from '../../store';

const DecksList = ({ deck }) => {
  const { state, dispatch } = useContext(store);

  console.log(deck);

  return (
    <ul>
      {deck.cards.map((card) => (
        <CardListItem key={card.id} card={card} />
      ))}
    </ul>
  );
};

export default DecksList;
