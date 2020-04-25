import React, { useContext, useState } from 'react';
import { store } from '../../store';
import DeckInfo from '../../components/common/DeckInfo';

const CreatePage = ({ location }) => {
  const { state, dispatch } = useContext(store);
  const { referral } = location.state;

  return (
    <div>
      {referral === 'home' ? (
        <DeckInfo />
      ) : (
        <div>
          <h2>Select deck to add card to</h2>
          <label htmlFor="deckList">
            <select name="deckList" id="deckList">
              {state.decks.map((deck) => (
                <option key={deck.id} value={deck.id}>
                  {deck.name}
                </option>
              ))}
              <option value="newDeck">New deck</option>
            </select>
          </label>
        </div>
      )}
      <div>
        <h2>Create a card</h2>
        <form onSubmit={() => {}}></form>
      </div>
      <div>
        <button>Save</button>
      </div>
    </div>
  );
};

export default CreatePage;
