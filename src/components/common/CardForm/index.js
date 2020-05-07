import React, { useState, useRef, useEffect } from 'react';
import InputField from '../InputField';
import Button from '../Button';
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
    <div className={styles.cardFormContainer}>
      {!cardDetailsMode && <p>Add new card</p>}
      <form className={`${styles.cardForm}`}>
        <div className={styles.cardForm__fromTo}>
          <InputField
            classNames={`input--pill ${!cardDetailsMode && 'grey-bg'}`}
            id="translateFrom"
            type="text"
            value={fromInput}
            placeholder="From"
            onChangeHandler={(e) =>
              handleDirty(e.target, fromRef, setFromInput)
            }
          />
          <InputField
            classNames={`input--pill ${!cardDetailsMode && 'grey-bg'}`}
            id="translateTo"
            type="text"
            value={toInput}
            placeholder="To"
            onChangeHandler={(e) => handleDirty(e.target, toRef, setToInput)}
          />
          <div></div>
        </div>
        <div className={styles.cardForm__notesAddCard}>
          <InputField
            classNames={`input--pill ${!cardDetailsMode && 'grey-bg'}`}
            id="cardNotes"
            type="textarea"
            value={notesInput}
            placeholder="Notes"
            onChangeHandler={(e) =>
              handleDirty(e.target, notesRef, setNotesInput)
            }
          />
        </div>
        <div>
          {!cardDetailsMode ? (
            <Button
              onClickHandler={(e) => handleSubmit(e)}
              type="submit"
              isDisabled={!deckId || disabledSave}
              value="ADD_CARD"
            >
              Add Card
            </Button>
          ) : (
            <>
              <div>
                <InputField
                  classNames={`input--pill ${!cardDetailsMode && 'grey-bg'}`}
                  id="tagsInput"
                  type="text"
                  placeholder="Tags"
                />
                <div></div>
              </div>
              <div>
                <Button
                  onClickHandler={(e) => handleSubmit(e)}
                  type="submit"
                  isDisabled={disabledSave}
                  value="UPDATE_CARD"
                >
                  Save
                </Button>
                <Button
                  onClickHandler={(e) => handleSubmit(e)}
                  type="submit"
                  isDisabled={false}
                  value="DELETE_CARD"
                >
                  Delete
                </Button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default CardForm;
