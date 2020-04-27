import DeckListItem from '../components/HomePage/DeckListItem';

function addNewDeck(state, deck) {
  const decks = [...state.decks];
  const newDeck = {
    id: deck.id,
    letter: deck.letter,
    name: deck.name,
    description: deck.description,
    languageId: deck.languageId,
  };
  return { ...state, decks: [...state.decks, newDeck] };
}

function changeLanguage(state, lang) {
  const currentLang = state.currentTargetLang;
  const newSelectedLang = {
    id: state.user.languages.find((l) => l.code === lang).id,
    code: lang,
  };
  return { ...state, currentTargetLang: newSelectedLang };
}

function loadCards(state, { cards, deckId }) {
  // update decks one by one as cards are being loaded each time deck is clicked on
  const updatedDecks = state.decks.map((deck) => {
    if (deck.id === deckId) return { ...deck, cards: cards };
    return deck;
  });
  return { ...state, decks: updatedDecks };
}

export default {
  addNewDeck,
  changeLanguage,
  loadCards,
};
