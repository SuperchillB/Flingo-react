import React from 'react';
import { Link } from '@reach/router';

const CardListItem = ({ card }) => {
  const { id, from, to, fromLang, toLang } = card;
  return (
    <li data-id={id}>
      {/* <Link to={`/decks/${deckId[0]}/${id}`}> */}
      <Link to={`/cards/${id}`} state={{ card }}>
        <span>{`${from} (${fromLang})`}</span>|
        <span>{`${to} (${toLang})`}</span>
      </Link>
    </li>
  );
};

export default CardListItem;
