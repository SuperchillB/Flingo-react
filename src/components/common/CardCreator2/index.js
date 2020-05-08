import React, { useContext, useEffect } from 'react';
import CardForm from '../CardForm';
import { store } from '../../../store';
import API from '../../../utils/apiUtils';
import { API_BASE_URL } from '../../../constants/apiConstants';
import axios from 'axios';
import CreateIcon from '../../../assets/flingo-icons-plus.svg';
import styles from './styles.module.scss';
import { useBreakpoint } from '../../../containers/BreakpointProvider';

const CardCreator2 = ({ deckId = null, onAddCard, onClosePanel }) => {
  const { currMatch } = useBreakpoint();
  const { state, dispatch } = useContext(store);

  const saveCard = async ({ cardData }) => {
    // Create API instance
    const api = new API({ url: API_BASE_URL.USERDATA[process.env.NODE_ENV] });
    // Create new token for the request
    let source = axios.CancelToken.source(); // TODO: refactor token cancelation inside apiUtils
    try {
      const response = await api.postCard(
        JSON.stringify({
          from: cardData.fromInput,
          fromLang: state.user.defaultLang.id,
          to: cardData.toInput,
          toLang: state.user.targetLang.id,
          notes: cardData.notesInput,
          tags: cardData.tagsList,
          deckId: [deckId],
          languageId: [state.user.targetLang.id],
        }),
        {
          cancelToken: source.token,
          headers: { 'Content-Type': 'application/json' },
        },
      );
      // If we're creating card from DeckDetails page or the containing deck was already pre-loaded
      if (
        window.location.pathname.includes('/decks/') ||
        state.decks.find((d) => d.id === deckId).cards.length > 0
      ) {
        // Dispatch to reducer
        dispatch({
          type: 'ADD_CARD',
          payload: {
            card: response.data,
          },
        });
      }
      // Tell parent new card is created to trigger re-navigation
      onAddCard();
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: { error },
      });
      if (!axios.isCancel(error)) {
        throw error;
      }
    }
  };

  useEffect(() => {
    if (currMatch === 'xs') {
      return () => {
        document.body.classList.remove('modal-open');
      };
    }
    return;
  }, []);

  return (
    <div className={styles.cardCreator}>
      <CreateIcon onClick={onClosePanel} />
      <CardForm
        deckId={deckId}
        deckView={true}
        onSubmit={saveCard} // No need to catch e.target.value since CardCreator only does POST requests
      />
    </div>
  );
};

export default CardCreator2;
