import React, { useState } from 'react';
import DeckInfo from '../../components/common/DeckInfo';

const DeckSelection = ({ decks, onSaveDeck }) => {
  const [hideDropdown, setHideDropdown] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState('default');

  // var selectedDeckData =
  //   selectedDeck !== 'default'
  //     ? decks.find((deck) => deck.id === selectedDeck)
  //     : {};

  const handleHideDropdown = (e) => {
    console.log(e.target);
    setSelectedDeck(e.target.value);
    // Send deck id to parent so it can be updated in CardCreator
    onSaveDeck(Number(e.target.value));
    if (e.target.value === 'newDeck') {
      setHideDropdown(true);
    } else {
      setHideDropdown(false);
    }
  };

  const passSaveDeckToParent = (id) => onSaveDeck(id);

  return (
    <>
      {hideDropdown ? (
        <div>
          <DeckInfo
            referral="navbar"
            onHideDropdown={handleHideDropdown}
            onSaveDeck={passSaveDeckToParent}
          />
        </div>
      ) : (
        <div>
          <h2>Select deck to add card to</h2>
          <label htmlFor="deckList">
            <select
              onChange={(e) => handleHideDropdown(e)}
              onBlur={() => {}}
              name="deckList"
              id="deckList"
              value={selectedDeck}
            >
              <option value="default">Select deck</option>
              {decks.map((deck) => (
                <option key={deck.id} value={deck.id}>
                  {deck.name}
                </option>
              ))}
              <option value="newDeck">New deck</option>
            </select>
          </label>
        </div>
      )}
    </>
  );
};

export default DeckSelection;
