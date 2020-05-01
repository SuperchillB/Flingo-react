import React, { useContext } from 'react';
import CardForm from '../../components/common/CardForm';
import { Link, navigate } from '@reach/router';
import { store } from '../../store';
import API from '../../utils/apiUtils';
import { API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios';

const CardDetails = ({ cardId, location }) => {
  const { state, dispatch } = useContext(store);
  const {
    from,
    fromLang,
    to,
    toLang,
    notes,
    tags,
    deckId,
  } = location.state.card;
  const parentDeck = state.decks.find((d) => d.id === deckId[0]);

  const handleSubmittedCard = async ({ actionType, cardData }) => {
    console.log(actionType, cardData);
    // Create API instance
    const api = new API({ url: API_BASE_URL.USERDATA[process.env.NODE_ENV] });
    // Create new token for the request
    let source = axios.CancelToken.source(); // TODO: refactor token cancelation inside apiUtils
    try {
      let response;
      let payload;
      if (actionType === 'UPDATE_CARD') {
        response = await api.putCard(
          JSON.stringify({
            id: Number(cardId),
            from: cardData.fromInput,
            fromLang: state.user.defaultLang.id,
            to: cardData.toInput,
            toLang: state.user.targetLang.id,
            notes: cardData.notesInput,
            tags: cardData.tagsList,
            deckId: [deckId[0]],
            languageId: [state.user.targetLang.id],
          }),
          {
            cancelToken: source.token,
            headers: { 'Content-Type': 'application/json' },
          },
        );
        payload = {
          updatedCard: response.data,
          parentDeck,
        };
      }
      if (actionType === 'DELETE_CARD') {
        response = await api.deleteCard(Number(cardId), {
          cancelToken: source.token,
        });
        payload = {
          deletedCardId: Number(cardId),
          parentDeck,
        };
      }
      // Dispatch to reducer and pass in corresponding action type (received from form) and payload
      dispatch({
        type: actionType,
        payload,
      });
      // Navigate back to parent deck
      navigate(`/decks/${deckId[0]}`);
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

  // TODO: add notes prop in cards
  return (
    <div>
      <Link to={`/decks/${deckId[0]}`}>{`Back to ${parentDeck.name}`}</Link>
      <CardForm
        from={from}
        fromLang={fromLang}
        to={to}
        toLang={toLang}
        notes={notes}
        tags={tags}
        deckId={deckId[0]}
        cardDetailsMode={true}
        onSubmit={handleSubmittedCard}
      />
    </div>
  );
};

export default CardDetails;
