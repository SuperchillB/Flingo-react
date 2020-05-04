Short term:

- Add delete deck logic from homepage (on hover)
- Add delete card logic from deck view page (on hover + multiple)
- Fix capital letter logo for decks
- Make 'save' button in deck view dynamically active (only show when something has changed => new deck info)
- Make 'update' button in card view dynamically active (only show when something has changed => new card info)
- Create tags logic (CardDetails)
- Create Sass config (create sassrc.js file and add module.exports = { data: '@import "./src/styles";' }; in it to import globally a single file => see https://github.com/parcel-bundler/parcel/issues/1725)

---

Longer term:

- Create useLocalStorage custom hook to store API calls in localStorage
- Create useFetch custom hook used in each page view
- Create route guards
- Add complete form validation/sanitisation for DeckInfo.js and CardForm.js (make useForm hook: https://hackernoon.com/react-form-validation-using-react-hooks-5859c32280ca)
- Add dynamic imports
- Create logic to cache API calls if not using localStorage
- Add translation API logic for cards
- Add search bar in homepage to searcg for both decks AND cards
- Create atom components for form elements (buttons, inputs, textarea, ...)
- Create cssnano config (https://parceljs.org/css.html)
- Create 404 page
- Create background blob (https://css-tricks.com/blobs/)
