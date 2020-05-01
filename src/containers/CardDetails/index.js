import React, { useContext } from 'react';
import { Link } from '@reach/router';
import { store } from '../../store';
import CardForm from '../../components/common/CardForm';

const CardDetails = ({ location }) => {
  const { state, dispatch } = useContext(store);
  const {
    id,
    from,
    fromLang,
    to,
    toLang,
    notes,
    tags,
    deckId,
  } = location.state.card;
  const parentDeck = state.decks.find((d) => d.id === deckId[0]);

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
      />
    </div>
  );
};

export default CardDetails;
