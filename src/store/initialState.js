const initialState = {
  user: {
    id: 7,
    email: 'email@email.com',
    password: '123',
    username: 'Bertie',
    languages: [
      { id: 1, code: 'fr' },
      { id: 2, code: 'es' },
    ],
    defaultLang: 'en',
    targetLang: { id: 1, code: 'fr' },
  },
  decks: [],
  currentTargetLang: { id: 1, code: 'fr' },
  loading: false,
  error: null,
};

export default initialState;
