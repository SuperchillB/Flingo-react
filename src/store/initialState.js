const initialState = {
  user: {
    id: 7,
    email: 'email@email.com',
    password: '123',
    username: 'Bertie',
    languages: [
      { id: 2, code: 'fr', name: 'Français' },
      { id: 3, code: 'es', name: 'Español' },
    ],
    defaultLang: { id: 1, code: 'en', name: 'English' },
    targetLang: { id: 2, code: 'fr', name: 'Français' },
  },
  decks: [],
  currentTargetLang: { id: 2, code: 'fr', name: 'Français' },
  loading: false,
  error: null,
};

export default initialState;
