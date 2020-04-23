export const API_BASE_URL = {
  USERDATA: {
    development: 'http://localhost:3000',
    production: 'http://localhost:3000', // TODO: change url to prod
  },
  TRANSLATION: '', // TODO: complete later
};

// TODO: complete with remaining paths if any
export const API_PATH = {
  USER: 'user',
  LANGUAGES: 'languages',
  DECKS: 'decks',
  CARDS: 'cards',
};

// GET methods
export const GET_ALL_DECKS = 'getAllDecks';
export const GET_DECKS_IN_LANG = 'getDecksInLang';
export const GET_DECK = 'getDeck';
export const GET_ALL_CARDS = 'getAllCards';
export const GET_CARDS_IN_DECK = 'getCardsInDeck';
export const GET_CARDS_IN_LANG = 'getCardsInLang';
export const GET_CARD = 'getCard';
// POST methods
export const POST_DECK = 'postDeck';
export const POST_CARD = 'postCard';
// PUT methods
export const PUT_DECK = 'putDeck';
export const PUT_CARD = 'putCard';
// PATCH methods
export const PATCH_DECK = 'patchDeck';
export const PATCH_CARD = 'patchCard';
// DELETE methods
export const DELETE_DECK = 'deleteDeck';
export const DELETE_CARD = 'deleteCard';

// export { API_BASE_URL, API_PATH };
