import React from 'react';

const CardListItem = ({ id, from, to, fromLang, toLang }) => {
  return (
    <li>
      <div data-id={id}>
        <span>{`${from} (${fromLang})`}</span>|
        <span>{`${to} (${toLang})`}</span>
      </div>
    </li>
  );
};

export default CardListItem;
