import React, { useState, useContext } from 'react';
import { store } from '../../store';

const CardCreator = ({ deckId = null, onAddCard }) => {
  const { state } = useContext(store);
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCardData = {
      from: fromText,
      fromLang: state.user.defaultLang.id,
      to: toText,
      toLang: state.user.targetLang.id,
      deckId: [10], // TODO: FIND WAY TO FETCH DECKID IF DECK NOT EXISTING ALREADY
      languageId: [state.user.targetLang.id],
    };
    onAddCard(newCardData);

    // const postData = JSON.stringify({
    //   name: '',
    //   description: '',
    //   languageId: [state.user.targetLang.id]
    // });
    // {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
    // }
  };

  return (
    <div>
      <form>
        <div>
          <div>
            <label htmlFor="translateFrom">
              <input
                id="translateFrom"
                type="text"
                value={fromText}
                placeholder="From"
                onChange={(e) => setFromText(e.target.value)}
              />
            </label>
            <label htmlFor="translateTo">
              <input
                id="translateTo"
                type="text"
                value={toText}
                placeholder="To"
                onChange={(e) => setToText(e.target.value)}
              />
            </label>
          </div>
          <div></div>
        </div>
        <div>
          <textarea
            name="cardNotes"
            id="cardNotes"
            cols="30"
            rows="10"
            value={notes}
            placeholder="Notes"
            onChange={(e) => setNotes(e.target.value)}
          />
          <button onClick={(e) => handleSubmit(e)} type="submit">
            Add Card
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardCreator;
