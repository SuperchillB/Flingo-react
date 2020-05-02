Short term:

- Add delete deck logic (from homepage (on hover) AND deck view page)
- Add delete card logic from deck view page (on hover)
- Fix capital letter logo for decks
- Disable 'save' button in DeckInfo (Create Page) once user has created new deck
- Make 'save' button in deck view dynamically active (only show when something has changed => new deck info)
- Make 'update' button in card view dynamically active (only show when something has changed => new card info)
- Create tags logic (CardDetails)

---

Longer term:

- Create useLocalStorage custom hook to store API calls in localStorage
- Create useFetch custom hook used in each page view
- Create route guards
- Add complete form validation/sanitisation for DeckInfo.js and CardForm.js
- Add dynamic imports
- Create logic to cache API calls if not using localStorage
- Add translation API logic for cards
- Add search bar in homepage to searcg for both decks AND cards
- Create atom components for form elements (buttons, inputs, textarea, ...)
