import React from 'react';
import { Link } from '@reach/router';
import styles from './styles.module.scss';

const CardListItem = ({ card }) => {
  const { id, from, to, fromLang, toLang } = card;
  return (
    <li className={styles.cardListItem} data-id={id}>
      {/* <Link to={`/decks/${deckId[0]}/${id}`}> */}
      <Link to={`/cards/${id}`} state={{ card }}>
        <div>
          <span>{`${from} (${fromLang})`}</span>
        </div>
        <div>
          <span>{`${to} (${toLang})`}</span>
        </div>
      </Link>
    </li>
  );
};

export default CardListItem;
