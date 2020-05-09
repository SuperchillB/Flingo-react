import React, { useContext, useState } from 'react';
import { store } from '../../store';
import DeckInfo from '../../components/common/DeckInfo';
import DeckSelection from '../../components/CreatePage/DeckSelection';
import CardCreator from '../../components/common/CardCreator';
import { navigate } from '@reach/router';
import styles from './styles.module.scss';

const CreatePage = ({ location }) => {
  const { state } = useContext(store);
  const { referral = 'navbar' } = location.state;
  const [deckId, setDeckId] = useState(null);

  // Update new deck ID once created so CardCreator is aware of it
  const handleSaveDeck = (id) => setDeckId(id);

  const handleSaveCard = () =>
    // navigate(`/decks/${deckId}`, { state: { fromCreatePage: true } }); // TODO: ADD REFERRAL HERE to distinguish where we came from when being redirected to DeckDetails
    navigate(`/decks/${deckId}`); // TODO: ADD REFERRAL HERE to distinguish where we came from when being redirected to DeckDetails

  return (
    <div className={styles.createPage}>
      {referral === 'home' ? (
        <div className={styles.deckInfo}>
          <p>Create new deck to add card to</p>
          <DeckInfo onSaveDeck={handleSaveDeck} />
        </div>
      ) : (
        <DeckSelection decks={state.decks} onSaveDeck={handleSaveDeck} />
      )}
      <div>
        <p>Create a card</p>
        <CardCreator deckId={deckId} onAddCard={handleSaveCard} />
      </div>
    </div>
  );
};

export default CreatePage;
