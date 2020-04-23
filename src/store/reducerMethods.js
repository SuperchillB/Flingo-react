function addNewDeck(state, deck) {
  const decks = [...state.decks];
  const newDeck = {
    letter: deck.letter,
    name: deck.name,
    description: deck.description,
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

export default {
  addNewDeck,
  changeLanguage,
};
