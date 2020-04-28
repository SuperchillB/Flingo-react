function addNewDeck(state, deck) {
  const decks = [...state.decks];
  console.log('addNewDeck', deck);
  const newDeck = {
    id: deck.id,
    letter: deck.letter,
    name: deck.name,
    description: deck.description,
    languageId: deck.languageId,
    cards: [],
  };
  return { ...state, decks: [...state.decks, newDeck] };
}

function addNewCard(state, card) {
  state.decks.find((deck) => deck.id === card.deckId[0]).cards.push(card);
  return { ...state };
}

function changeLanguage(state, lang) {
  const currentLang = state.currentTargetLang;
  const newSelectedLang = {
    id: state.user.languages.find((l) => l.code === lang).id,
    code: lang,
    name: state.user.languages.find((l) => l.code === lang).name,
  };
  return {
    ...state,
    user: { ...state.user, targetLang: newSelectedLang },
    currentTargetLang: newSelectedLang,
  };
}

function loadCards(state, { cards, deckId }) {
  // update decks one by one as cards are being loaded each time deck is clicked on
  const updatedDecks = state.decks.map((deck) => {
    if (deck.id === deckId) return { ...deck, cards: cards }; // TODO: remove cards here and instead add cards: [] in addNewDeck above?
    return deck;
  });
  return { ...state, decks: updatedDecks };
}

export default {
  addNewDeck,
  addNewCard,
  changeLanguage,
  loadCards,
};
