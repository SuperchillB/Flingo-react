import React, { useContext } from 'react';
import { store } from '../../store';

const DeckDetails = ({ deckId, location }) => {
  const globalState = useContext(store);
  console.log('globalState DeckDetails', globalState);
  return (
    <div>
      <h1>Deck id: {deckId}</h1>
      <ul>
        <li>ID: {location.state.id}</li>
        <li>Letter: {location.state.letter}</li>
        <li>Name: {location.state.name}</li>
      </ul>
    </div>
  );
};

export default DeckDetails;
