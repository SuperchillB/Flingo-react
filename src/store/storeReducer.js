import methods from './reducerMethods';

const storeReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      console.log('ADD_USER');
      return;
    case 'ADD_DECK':
      return methods.addNewDeck(state, action.payload.deck);
    case 'ADD_CARD':
      return methods.addNewCard(state, action.payload.card);
    case 'LOAD_USER':
      console.log('LOAD_USER');
      return;
    case 'LOAD_USER_DATA':
      console.log('LOAD_USER_DATA');
      return;
    case 'LOAD_DECKS':
      // return { ...state, decks: action.payload.decks, loading: false };
      return methods.loadDecks(state, action.payload.decks);
    case 'LOAD_CARDS':
      return methods.loadCards(state, action.payload);
    case 'UPDATE_USER':
      console.log('UPDATE_USER');
      return;
    case 'UPDATE_DECK':
      return methods.updateDeck(state, action.payload.deck);
    case 'UPDATE_CARD':
      return methods.updateCard(state, action.payload);
    case 'DELETE_USER':
      console.log('DELETE_USER');
      return;
    case 'DELETE_DECK':
      return;
    case 'DELETE_CARD':
      return methods.deleteCard(state, action.payload);
    case 'CHANGE_LANGUAGE':
      return methods.changeLanguage(state, action.payload.lang);
    case 'LOADING':
      console.log('LOADING');
      return { ...state, loading: true };
    case 'ERROR':
      console.log('ERROR');
      return { ...state, error: action.payload.error, loading: false };
    default:
      throw new Error();
  }
};

export default storeReducer;
