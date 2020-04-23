import React, { useState, useContext } from 'react';
import DeckListItem from './DeckListItem';
import { store } from '../../store';

// const deckList = [
//   {
//     id: 1,
//     letter: 'A',
//     name: 'Animals',
//   },
//   {
//     id: 2,
//     letter: 'F',
//     name: 'Family',
//   },
//   {
//     id: 3,
//     letter: 'G',
//     name: 'Geography',
//   },
//   {
//     id: 4,
//     letter: 'D',
//     name: 'Date/Time',
//   },
//   {
//     id: 5,
//     letter: 'J',
//     name: 'Jobs',
//   },
//   {
//     id: 6,
//     letter: 'N',
//     name: 'Numbers',
//   },
// ];

const DecksList = () => {
  // const [decks, setDecks] = useState(deckList);
  const { state, dispatch } = useContext(store);

  console.log(state);

  // return (
  //   <ul>
  //     {decks.map((deck) => (
  //       <DeckListItem key={deck.id} {...deck} />
  //     ))}
  //   </ul>
  // );
  return (
    <ul>
      {state.decks.map((deck) => (
        <DeckListItem key={deck.id} {...deck} />
      ))}
    </ul>
  );
};

export default DecksList;
