import React from 'react';

const DeckInfo = ({ name = 'Title', description = 'Description' }) => {
  return (
    <div>
      <div></div>
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default DeckInfo;
