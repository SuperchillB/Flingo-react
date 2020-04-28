import React, { useContext, useState } from 'react';
import { store } from '../../store';
import DeckInfo from '../../components/common/DeckInfo';
import DeckSelection from '../../components/CreatePage/DeckSelection';
import CardCreator from '../../components/common/CardCreator';
import { navigate } from '@reach/router';

const CreatePage = ({ location }) => {
  const { state } = useContext(store);
  const { referral = 'navbar' } = location.state;
  const [deckId, setDeckId] = useState(null);

  // Update new deck ID once created so CardCreator is aware of it
  const handleSaveDeck = (id) => setDeckId(id);

  const handleSaveCard = () => navigate(`/decks/${deckId}`);

  return (
    <div>
      {referral === 'home' ? (
        <DeckInfo onSaveDeck={handleSaveDeck} />
      ) : (
        <DeckSelection decks={state.decks} onSaveDeck={handleSaveDeck} />
      )}
      <div>
        <h2>Create a card</h2>
        <CardCreator deckId={deckId} onAddCard={handleSaveCard} />
      </div>
    </div>
  );
};

export default CreatePage;
