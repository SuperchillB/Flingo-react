import React, { useContext, useState } from 'react';
import { Link } from '@reach/router';
import { store } from '../../store';

const Header = ({ onSelectLang }) => {
  const { state, dispatch } = useContext(store);
  const [language, setLanguage] = useState(state.currentTargetLang.code);

  const selectLang = (e) => {
    // setLanguage(state.user.languages.find((l) => l.code === e.target.value));
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
    <nav>
      <div>
        <Link to="/">
          <h3>Flingo</h3>
        </Link>
        {window.location.pathname === '/' && (
          <label htmlFor="language-dropdown">
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
        )}
      </div>
      <ul>
        <li>
          <Link to="/">Decks</Link>
        </li>
        <li>
          <Link to="/create" state={{ referral: 'navbar' }}>
            Create
          </Link>
        </li>
        <li>
          <Link to="/quiz">Quiz</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
