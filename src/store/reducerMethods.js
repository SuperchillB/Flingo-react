function addNewDeck(state, deck) {
  const decks = [...state.decks];
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

function updateDeck(state, updatedDeck) {
  const foundIndex = state.decks.findIndex((deck) => deck.id == updatedDeck.id);
  state.decks[foundIndex] = Object.assign(
    {},
    state.decks[foundIndex],
    updatedDeck,
  );
  return { ...state };
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
  console.log('changeLanguage', {
    state,
    lang,
    newSelectedLang,
  });
  return {
    ...state,
    user: { ...state.user, targetLang: newSelectedLang },
    currentTargetLang: newSelectedLang,
  };
}

function loadDecks(state, decks = []) {
  // First load only
  if (decks.length > 0) {
    const completeDecks = decks.map((deck) => {
      const currentDeckInState = state.decks.find((d) => d.id === deck.id);
      // make sure not to overwrite preloaded cards
      if (
        currentDeckInState &&
        currentDeckInState.cards &&
        currentDeckInState.cards.length > 0
      )
        return { ...currentDeckInState };
      // add cards prop if no cards loaded yet
      return { ...deck, letter: deck.name[0].toUpperCase(), cards: [] }; // TODO: refactor properties inside each deck ("letter" vs "logo", "description", ...)
    });
    return { ...state, decks: completeDecks, loading: false };
  }
  // Return cached decks
  return { ...state, loading: false };
}

function loadCards(
  state,
  { cards = [], deckId = null, fromCreatePage = false },
) {
  console.log('loadCards');
  // First load only
  // if (cards.length > 0 || fromCreatePage) {
  if (cards.length > 0) {
    // update decks one by one as cards are being loaded each time deck is clicked on
    const updatedDecks = state.decks.map((deck) => {
      // if (deck.id === deckId) return { ...deck, cards: cards }; // TODO: remove cards here and instead add cards: [] in addNewDeck above?
      if (deck.id === deckId)
        // return { ...deck, cards: [...cards, ...deck.cards] }; // TODO: remove cards here and instead add cards: [] in addNewDeck above?
        return { ...deck, cards: cards };
      return deck;
    });
    return { ...state, decks: updatedDecks };
  }
  // Return cached cards
  return { ...state };
}

export default {
  addNewDeck,
  addNewCard,
  changeLanguage,
  loadCards,
  loadDecks,
  updateDeck,
};
