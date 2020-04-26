import React from 'react';

const DeckInfo = ({
  id = null,
  letter = '',
  name = '',
  description = '',
  onHideDropdown,
}) => {
  const handleHideDropdown = (e) => onHideDropdown(e);

  console.log('DeckInfo', {
    id,
    name,
    description,
    onHideDropdown,
  });

  const handleSaveDeck = () => {
    // ! if no existing id => = new deck => postDeck
    // ! if existing id => = existing deck => putDeck or patchDeck
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
      <div>{letter}</div>
      <div>
        <label htmlFor="deckTitle">
          <input
            id="deckTitle"
            name="title"
            type="text"
            value={name}
            placeholder="Title"
          />
        </label>
        <label htmlFor="deckDescription">
          <textarea
            name="deckDescription"
            id="deckDescription"
            cols="30"
            rows="5"
            value={description}
            placeholder="Description"
          />
        </label>
      </div>
      <div>
        <button onClick={(e) => handleHideDropdown(e)}>Change deck</button>
        <button onClick={() => handleSaveDeck}>Save</button>
      </div>
    </div>
  );
};

export default DeckInfo;
