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

function deleteDeck(state, { deletedDeckId = null }) {
  const newDeckList = state.decks.filter((deck) => deck.id !== deletedDeckId);
  // state.decks = newDeckList;
  return { ...state, decks: newDeckList };
}

function loadCards(state, { cards = [], deckId = null }) {
  console.log('loadCards');
  // First load only
  if (cards.length > 0) {
    // update decks one by one as cards are being loaded each time deck is clicked on
    const updatedDecks = state.decks.map((deck) => {
      if (deck.id === deckId) return { ...deck, cards: cards };
      return deck;
    });
    return { ...state, decks: updatedDecks };
  }
  // Return cached cards
  return { ...state };
}

function addNewCard(state, card) {
  state.decks.find((deck) => deck.id === card.deckId[0]).cards.push(card);
  return { ...state };
}

function updateCard(state, { updatedCard = {}, parentDeck = {} }) {
  const foundCardIndex = parentDeck.cards.findIndex(
    (card) => card.id == updatedCard.id,
  );
  parentDeck.cards[foundCardIndex] = Object.assign(
    {},
    parentDeck.cards[foundCardIndex],
    updatedCard,
  );
  return { ...state };
}

// TODO: Add logic to delete multiple cards at the same time (last ex in https://flaviocopes.com/how-to-remove-item-from-array/)
function deleteCard(state, { deletedCardId = null, parentDeck = {} }) {
  const newCardList = parentDeck.cards.filter(
    (card) => card.id !== deletedCardId,
  );
  parentDeck.cards = newCardList;
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

export default {
  addNewDeck,
  addNewCard,
  changeLanguage,
  deleteCard,
  deleteDeck,
  loadCards,
  loadDecks,
  updateCard,
  updateDeck,
};
