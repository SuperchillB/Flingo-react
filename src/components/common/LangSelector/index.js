import React, { useContext, useState } from 'react';
import { store } from '../../../store';

// const LangSelector = ({onSelectLang}) => {
const LangSelector = () => {
  const { state, dispatch } = useContext(store);
  const [language, setLanguage] = useState(state.currentTargetLang.code);

  const selectLang = (e) => {
    setLanguage(e.target.value);
    // onSelectLang(e);
    dispatch({
      type: 'CHANGE_LANGUAGE',
      payload: {
        lang: e.target.value,
      },
    });
  };

  return (
    <label className="no-styles" htmlFor="language-dropdown">
      <select
        onChange={selectLang}
        onBlur={() => null}
        name="language-dropdown"
        id="language-dropdown"
        value={language}
      >
        {state.user.languages.map((lang) => (
          <option key={lang.id} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LangSelector;
