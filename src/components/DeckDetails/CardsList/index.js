import React, { useState, useContext } from 'react';
import CardListItem from '../CardListItem';
import { store } from '../../../store';
import styles from './styles.module.scss';

const CardsList = ({ deck = {} }) => {
  const { state, dispatch } = useContext(store);

  console.log(deck);

  return (
    <ul className={styles.cardList}>
      {deck.cards &&
        deck.cards.map((card) => <CardListItem key={card.id} card={card} />)}
    </ul>
  );
};

export default CardsList;
