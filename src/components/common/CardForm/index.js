import React, { useState, useRef, useEffect } from 'react';
import InputField from '../InputField';
import Button from '../Button';
import Trash from '../../../assets/flingo-icons-bin.svg';
import QuizIcon from '../../../assets/flingo-icons-quiz.svg';
import NoQuizIcon from '../../../assets/flingo-icons-no-quiz.svg';
import styles from './styles.module.scss';

const CardForm = ({
  from = '',
  fromLang = '',
  to = '',
  toLang = '',
  notes = '',
  tags = [],
  quiz = true,
  deckId = null,
  cardView = false,
  deckView = false,
  onSubmit = () => {},
  onDelete = () => {},
}) => {
  const [fromInput, setFromInput] = useState(from);
  const [toInput, setToInput] = useState(to);
  const [notesInput, setNotesInput] = useState(notes);
  const [tagsList, setTagsList] = useState(tags);
  const [isQuizzed, setIsQuizzed] = useState(quiz);
  const [disabledSave, setDisabledSave] = useState(true);
  const fromRef = useRef(fromInput);
  const toRef = useRef(toInput);
  const notesRef = useRef(notesInput);
  const tagsRef = useRef(tagsList);
  const isMounted = useRef(false);

  // const handleSubmit = (e) => {
  const handleSubmit = ({ e, value }) => {
    if (e) e.preventDefault();
    const cardData = { fromInput, toInput, notesInput, tagsList, isQuizzed };
    // onSubmit({ actionType: e.target.value, cardData });
    onSubmit({ actionType: value, cardData });
    setFromInput('');
    setToInput('');
    setNotesInput('');
    setTagsList([]);
    setIsQuizzed(true);
    isMounted.current = false;
  };

  const handleHideFromQuiz = (e) => {
    setIsQuizzed(!isQuizzed);
    handleSubmit({ e });
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

  // useEffect(() => {
  //   if (isMounted.current) {
  //     handleSubmit({ value: 'UPDATE_CARD' });
  //     isMounted.current = false;
  //   } else {
  //     isMounted.current = true;
  //   }
  // }, [isQuizzed]);

  return (
    <div className={styles.cardFormContainer}>
      {deckView && <p>Add new card</p>}
      <form className={`${styles.cardForm}`}>
        {/* <div className={styles.cardForm__fromTo}> */}
        <div className={styles.cardForm__inputs}>
          <InputField
            classNames={`input--pill ${deckView && 'grey-bg'}`}
            id="translateFrom"
            type="text"
            value={fromInput}
            placeholder="From"
            onChangeHandler={(e) =>
              handleDirty(e.target, fromRef, setFromInput)
            }
          />
          <InputField
            classNames={`input--pill ${deckView && 'grey-bg'}`}
            id="translateTo"
            type="text"
            value={toInput}
            placeholder="To"
            onChangeHandler={(e) => handleDirty(e.target, toRef, setToInput)}
          />
          <div></div>
          <InputField
            classNames={`input--pill ${deckView && 'grey-bg'}`}
            id="cardNotes"
            type="textarea"
            value={notesInput}
            placeholder="Notes"
            onChangeHandler={(e) =>
              handleDirty(e.target, notesRef, setNotesInput)
            }
          />
          {cardView && (
            <>
              <InputField
                classNames={`input--pill ${deckView && 'grey-bg'}`}
                id="tagsInput"
                type="text"
                placeholder="Tags"
              />
              <Button
                onClickHandler={() => setIsQuizzed(!isQuizzed)}
                type="button"
                style="no-bg"
                isDisabled={false}
                value="UPDATE_CARD"
              >
                {isQuizzed && <NoQuizIcon />}
                {isQuizzed && 'Hide from quiz'}
                {!isQuizzed && <QuizIcon className={styles.quizzed} />}
                {!isQuizzed && 'Show in quiz'}
              </Button>
            </>
          )}
        </div>
        {/* <div className={styles.cardForm__notesAddCard}>
          <InputField
            classNames={`input--pill ${!cardView && 'grey-bg'}`}
            id="cardNotes"
            type="textarea"
            value={notesInput}
            placeholder="Notes"
            onChangeHandler={(e) =>
              handleDirty(e.target, notesRef, setNotesInput)
            }
          />
        </div> */}
        <div className={styles.cardForm__buttons}>
          {!cardView ? (
            <Button
              // onClickHandler={(e) => handleSubmit(e)}
              onClickHandler={(e) => handleSubmit({ e, value: e.target.value })}
              type="submit"
              isDisabled={!deckId || disabledSave}
              value="ADD_CARD"
            >
              Add Card
            </Button>
          ) : (
            <>
              <Button
                // onClickHandler={(e) => handleSubmit(e)}
                onClickHandler={(e) =>
                  handleSubmit({ e, value: e.target.value })
                }
                type="submit"
                isDisabled={disabledSave}
                value="UPDATE_CARD"
              >
                Save
              </Button>
              {/* <Button
                onClickHandler={(e) => handleSubmit(e)}
                type="button"
                style="no-bg"
                isDisabled={false}
                value="DELETE_CARD"
              > */}
              <Button
                onClickHandler={onDelete}
                type="button"
                style="no-bg"
                isDisabled={false}
                value="DELETE_CARD"
              >
                <Trash />
                Delete
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default CardForm;
