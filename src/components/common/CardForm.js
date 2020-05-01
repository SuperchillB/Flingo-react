import React, { useState } from 'react';

const CardForm = ({
  from = '',
  fromLang = '',
  to = '',
  toLang = '',
  notes = '',
  tags = [],
  deckId = null,
  cardDetailsMode = false,
  onSubmit = () => {},
}) => {
  const [fromInput, setFromInput] = useState(from);
  const [toInput, setToInput] = useState(to);
  const [notesInput, setNotesInput] = useState(notes);
  const [tagsList, setTagsList] = useState(tags);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cardData = { fromInput, toInput, notesInput, tagsList };
    onSubmit({ actionType: e.target.value, cardData });
    setFromInput('');
    setToInput('');
    setNotesInput('');
    setTagsList([]);
  };

  return (
    <form>
      <div>
        <div>
          <label htmlFor="translateFrom">
            <input
              id="translateFrom"
              type="text"
              value={fromInput}
              placeholder="From"
              onChange={(e) => setFromInput(e.target.value)}
            />
          </label>
          <label htmlFor="translateTo">
            <input
              id="translateTo"
              type="text"
              value={toInput}
              placeholder="To"
              onChange={(e) => setToInput(e.target.value)}
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
          value={notesInput}
          placeholder="Notes"
          onChange={(e) => setNotesInput(e.target.value)}
        />
        {!cardDetailsMode && (
          <button
            onClick={(e) => handleSubmit(e)}
            type="submit"
            disabled={!deckId}
            value="ADD_CARD"
          >
            Add Card
          </button>
        )}
      </div>
      {cardDetailsMode && (
        <>
          <div>
            <label htmlFor="tagsInput">
              <input id="tagsInput" type="text" placeholder="Tags" />
            </label>
            <div></div>
          </div>
          <div>
            <button
              onClick={(e) => handleSubmit(e)}
              type="submit"
              disabled={false}
              value="UPDATE_CARD"
            >
              Update Card
            </button>
            <button
              onClick={(e) => handleSubmit(e)}
              type="submit"
              disabled={false}
              value="DELETE_CARD"
            >
              Delete Card
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default CardForm;
