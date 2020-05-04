import React, { useContext, useState } from 'react';
import { Link } from '@reach/router';
import { store } from '../../../store';
import DecksIcon from '../../../assets/flingo-icons-decks.svg';
import CreateIcon from '../../../assets/flingo-icons-plus.svg';
import QuizIcon from '../../../assets/flingo-icons-quiz.svg';
import ProfileIcon from '../../../assets/flingo-icons-profile.svg';
import styles from './styles.module.scss';

const NavBar = ({ onSelectLang }) => {
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
    <nav className={styles.navbar}>
      <div>
        <Link to="/">
          <span>flingo</span>
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
          <NavLink to="/">
            <DecksIcon /> Decks
          </NavLink>
        </li>
        <li>
          <NavLink to="/create" state={{ referral: 'navbar' }}>
            <CreateIcon />
            Create
          </NavLink>
        </li>
        <li>
          <NavLink to="/quiz">
            <QuizIcon /> Quiz
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile">
            <ProfileIcon /> Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return isCurrent ? { className: styles.active } : {};
    }}
  />
);

export default NavBar;
