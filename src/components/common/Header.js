import React from 'react';
import { Link } from '@reach/router';

const Header = ({ onSelectLang }) => {
  const selectLang = (e) => onSelectLang(e);
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
          >
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
        </label>
      </div>
      <ul>
        <li>
          <Link to="/">Decks</Link>
        </li>
        <li>
          <Link to="/create">Create</Link>
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
