import React, { useContext, useState } from 'react';
import NoQuiz from '../../../assets/flingo-icons-no-quiz.svg';
import MoveTo from '../../../assets/flingo-icons-export.svg';
import Trash from '../../../assets/flingo-icons-bin.svg';
import styles from './styles.module.scss';
import Tooltip from '../../common/Tooltip';
import { Modal, modalState } from '../../common/Modal';
import DeckSelection from '../../CreatePage/DeckSelection';
import { store } from '../../../store';
import { deckState } from '../../../containers/App';
import API from '../../../utils/apiUtils';
import { API_BASE_URL } from '../../../constants/apiConstants';
import axios from 'axios';

const SelectedCardActions = ({ deckId }) => {
  const { state, dispatch } = useContext(store);
  const { deckContext, updateContext } = useContext(deckState);
  const { modalContext, updateModalContext } = useContext(modalState);
  const [selectedAction, setSelectedAction] = useState('');
  const currentDeck = state.decks.find((deck) => deck.id === deckId);

  const modalBody = () => {
    if (selectedAction === 'no-quiz') {
      return <p>No quiz</p>;
    }
    if (selectedAction === 'move-to') {
      // return <DeckSelection />;
      return <p>Move to another deck</p>;
    }
    if (selectedAction === 'delete') {
      return <p>Delete card(s)</p>;
    }
    return;
  };

  const clickHandler = (value) => {
    setSelectedAction(value);
    updateModalContext('isOpen', true);
  };

  const hideFromQuizHandler = async () => {
    // // Collect all cards in deck with updated quiz prop
    // const updatedCards = currentDeck.cards.map((card) => {
    //   if (deckContext.selectedCards.includes(card.id)) {
    //     return { ...card, quiz: !card.quiz };
    //   }
    //   return card;
    // });
    // // Create API instance
    // const api = new API({ url: API_BASE_URL.USERDATA[process.env.NODE_ENV] });
    // // Create new token for the request
    // let source = axios.CancelToken.source(); // TODO: refactor token cancelation inside apiUtils
    // try {
    //   const response = await api.patchDeck(
    //     JSON.stringify({
    //       id: deckId,
    //       props: {
    //         cards: updatedCards,
    //       },
    //     }),
    //     {
    //       cancelToken: source.token,
    //       headers: { 'Content-Type': 'application/json' },
    //     },
    //   );
    //   // Dispatch to reducer
    //   dispatch({
    //     type: 'UPDATE_DECK',
    //     payload: {
    //       deck: response.data,
    //     },
    //   });
    //   // Unselect cards
    //   updateContext('selectedCards', []);
    // } catch (error) {
    //   dispatch({
    //     type: 'ERROR',
    //     payload: { error },
    //   });
    //   if (!axios.isCancel(error)) {
    //     throw error;
    //   }
    // }
  };

  return (
    <>
      <ul className={styles.cardActions}>
        <li>
          <Tooltip text="Hide from quiz" position="top" />
          <NoQuiz onClick={hideFromQuizHandler} />
        </li>
        <li>
          <Tooltip text="Move to deck" position="top" />
          <MoveTo onClick={() => clickHandler('move-to')} />
        </li>
        <li>
          <Tooltip text="Delete" position="top" />
          <Trash onClick={() => clickHandler('delete')} />
        </li>
      </ul>
      <Modal>{modalBody()}</Modal>
    </>
  );
};

export default SelectedCardActions;
