import axios from 'axios';
import { API_PATH } from '../../constants/apiConstants';
import { isEmpty } from '../dataStructureUtils';

// TODO: refactor token cancelation here in separate function
// TODO: use DEBUG bellow in that separate function
// TODO: implement progress bar with https://github.com/rikmms/progress-bar-4-axios/

// const DEBUG = (window.location.hostname === 'localhost');

export default class API {
  constructor({ url }) {
    this.url = url;
  }

  // ! http://localhost:3000/languages/2/cards?deckId=9

  // GET
  getAllDecks = (config = {}) => {
    return axios.get(`${this.url}/${API_PATH.DECKS}`, config); // ! CancelToken goes in the 'config' upon class instantiation
  };
  getDecksInLang = (langId = null, config = {}) => {
    if (!langId || typeof langId !== 'number') return false;
    return axios.get(
      `${this.url}/${API_PATH.LANGUAGES}/${langId}/${API_PATH.DECKS}`,
      config,
    ); // ! CancelToken goes in the 'config' upon class instantiation
  };
  getDeck = (deckId = null, config = {}) => {
    if (!deckId || typeof deckId !== 'number') return false;
    return axios.get(`${this.url}/${API_PATH.DECKS}/${deckId}`, config);
    // return axios.get(`${this.url}/${API_PATH.LANGUAGES}/${langId}/${API_PATH.DECKS}?id=${deckId}`, config);
  };
  getAllCards = (config = {}) => {
    return axios.get(`${this.url}/${API_PATH.CARDS}`, config);
  };
  getCardsInDeck = (deckId = null, config = {}) => {
    console.log('getCardsInDeck', deckId);
    if (!deckId || typeof deckId !== 'number') return false;
    return axios.get(
      `${this.url}/${API_PATH.DECKS}/${deckId}/${API_PATH.CARDS}`,
      // `${this.url}/${API_PATH.LANGUAGES}/${langId}/${API_PATH.CARDS}?deckId=${deckId}`,
      config,
    );
  };
  getCardsInLang = (langId = null, config = {}) => {
    if (!langId || typeof langId !== 'number') return false;
    return axios.get(
      `${this.url}/${API_PATH.LANGUAGES}/${langId}/${API_PATH.CARDS}`,
      config,
    );
  };
  getCard = (cardId = null, config = {}) => {
    if (!cardId || typeof cardId !== 'number') return false;
    return axios.get(`${this.url}/${API_PATH.CARDS}/${cardId}`, config);
    // return axios.get(`${this.url}/${API_PATH.LANGUAGES}/${langId}/${API_PATH.CARDS}?id=${cardId}`, config);
  };

  // POST
  postDeck = (deck = {}, config = {}) => {
    if (!deck || isEmpty(deck)) return false;
    return axios.post(`${this.url}/${API_PATH.DECKS}`, deck, config);
  };
  postCard = (card = {}, config = {}) => {
    if (!card || isEmpty(card)) return false;
    return axios.post(`${this.url}/${API_PATH.CARDS}`, card, config);
  };

  // PUT
  putDeck = (deck = {}, config = {}) => {
    if (!deck || isEmpty(deck)) return false;
    const deckId = JSON.parse(deck).id;
    return axios.put(`${this.url}/${API_PATH.DECKS}/${deckId}`, deck, config);
  };
  putCard = (card = {}, config = {}) => {
    console.log(card);
    if (!card || isEmpty(card)) return false;
    const cardId = JSON.parse(card).id;
    return axios.put(`${this.url}/${API_PATH.CARDS}/${cardId}`, card, config);
  };

  // PATCH
  patchDeck = ({ id = null, deck = {} }, config = {}) => {
    if ((!id || typeof id !== 'number') && (!deck || isEmpty(deck)))
      return false;
    return axios.patch(`${this.url}/${API_PATH.DECKS}/${id}`, deck, config);
  };
  patchCard = ({ id = null, card = {} }, config = {}) => {
    if ((!id || typeof id !== 'number') && (!card || isEmpty(card)))
      return false;
    return axios.patch(`${this.url}/${API_PATH.CARDS}/${id}`, card, config);
  };

  // DELETE
  deleteDeck = (id = null, config = {}) => {
    if (!id || typeof id !== 'number') return false;
    return axios.delete(`${this.url}/${API_PATH.DECKS}/${id}`, config);
  };
  deleteCard = (id = null, config = {}) => {
    if (!id || typeof id !== 'number') return false;
    return axios.delete(`${this.url}/${API_PATH.CARDS}/${id}`, config);
  };
}

// import axios from 'axios';

// const tokens = {};

// const DEBUG = (window.location.hostname === 'localhost');

// export default (url = null, state = null, options = {}, resolve = () => {}, reject = () => {}) => {
//     if (!url || !state) { return false; };

//     if (DEBUG) console.time(url);

// }

// const loadData = async () => {
//     const response = await axios.get(url)
// }
