import React, { useContext } from 'react';
import { store } from '../../store';
import DeckInfo from '../../components/common/DeckInfo';
import DeckSelection from '../../components/CreatePage/DeckSelection';
import CardCreator from '../../components/common/CardCreator';

const CreatePage = ({ location }) => {
  const { state, dispatch } = useContext(store);
  const { referral = 'navbar' } = location.state;

  const handleSave = (data) => {
    // dispatch new deck (with or without added card)
    console.log('handleSave', data);
  };

  return (
    <div>
      {referral === 'home' ? (
        <DeckInfo />
      ) : (
        <DeckSelection decks={state.decks} />
      )}
      <div>
        <h2>Create a card</h2>
        <CardCreator onAddCard={handleSave} />
      </div>
    </div>
  );
};

export default CreatePage;
