import React from 'react';
import { Link } from '@reach/router';

const DeckListItem = ({ id, letter, name, description }) => {
  return (
    <li>
      <Link to={`/decks/${id}`} state={{ id, letter, name }}>
        <span>{letter}</span>
        <p>{name}</p>
        <p>{description}</p>
      </Link>
    </li>
  );
};

export default DeckListItem;
