import React, { useContext } from 'react';
import { Link } from '@reach/router';
import { store } from '../../store';

const Header = ({ onSelectLang }) => {
  const { state } = useContext(store);

  const selectLang = (e) => {
    onSelectLang(e);
  };
  return (
    <header>
      <div>
        <h3>Flingo</h3>
        <label htmlFor="language-dropdown">
          <select
            onChange={selectLang}
            onBlur={() => null}
            name="language-dropdown"
            id="language-dropdown"
            value={state.user.targetLang.code}
          >
            {state.user.languages.map((lang) => (
              <option key={lang.id} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </label>
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
    </header>
  );
};

export default Header;
