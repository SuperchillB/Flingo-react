import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';

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
  const [disabledSave, setDisabledSave] = useState(true);
  const fromRef = useRef(fromInput);
  const toRef = useRef(toInput);
  const notesRef = useRef(notesInput);
  const tagsRef = useRef(tagsList);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cardData = { fromInput, toInput, notesInput, tagsList };
    onSubmit({ actionType: e.target.value, cardData });
    setFromInput('');
    setToInput('');
    setNotesInput('');
    setTagsList([]);
  };

  // const handleDirty = (value, stateValue, stateValueUpdater) => {
  const handleDirty = ({ value, id }, refValue, stateValueUpdater) => {
    stateValueUpdater(value);
    // TODO: make different condition for tags?
    if (fromInput.length === 0 || toInput.length === 0) {
      setDisabledSave(true);
    } else if (value === refValue.current) {
      setDisabledSave(true);
    } else {
      setDisabledSave(false);
    }
  };

  return (
    <div
      className={`${styles.cardFormContainer} ${
        cardDetailsMode ? 'cardView' : ''
      }`}
    >
      <form className={`${styles.cardForm}`}>
        <div className={styles.cardForm__fromTo}>
          <div className={styles.cardForm__fromTo__inputs}>
            <label htmlFor="translateFrom">
              <input
                id="translateFrom"
                type="text"
                value={fromInput}
                placeholder="From"
                onChange={(e) => handleDirty(e.target, fromRef, setFromInput)}
                // onChange={(e) => setFromInput(e.target.value)}
              />
              <span></span>
            </label>
            <label htmlFor="translateTo">
              <input
                id="translateTo"
                type="text"
                value={toInput}
                placeholder="To"
                onChange={(e) => handleDirty(e.target, toRef, setToInput)}
                // onChange={(e) => setToInput(e.target.value)}
              />
              <span></span>
            </label>
          </div>
          <div></div>
        </div>
        <div className={styles.cardForm__notesAddCard}>
          <label htmlFor="cardNotes">
            <textarea
              name="cardNotes"
              id="cardNotes"
              value={notesInput}
              placeholder="Notes"
              onChange={(e) => handleDirty(e.target, notesRef, setNotesInput)}
              // onChange={(e) => setNotesInput(e.target.value)}
            />
            <span></span>
          </label>
          {!cardDetailsMode && (
            <button
              onClick={(e) => handleSubmit(e)}
              type="submit"
              disabled={!deckId || disabledSave}
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
                <span></span>
              </label>
              <div></div>
            </div>
            <div>
              <button
                onClick={(e) => handleSubmit(e)}
                type="submit"
                disabled={disabledSave}
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
    </div>
  );
};

export default CardForm;
