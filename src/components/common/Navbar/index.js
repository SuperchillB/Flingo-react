import React, { useContext, useState } from 'react';
import { Link } from '@reach/router';
import { store } from '../../../store';
import Logo from '../Logo';
import LangSelector from '../LangSelector';
import DecksIcon from '../../../assets/flingo-icons-decks.svg';
import CreateIcon from '../../../assets/flingo-icons-plus.svg';
import QuizIcon from '../../../assets/flingo-icons-quiz.svg';
import ProfileIcon from '../../../assets/flingo-icons-profile.svg';
import styles from './styles.module.scss';
import { useBreakpoint } from '../../../containers/BreakpointProvider';

const NavBar = ({ onSelectLang }) => {
  const { currMatch } = useBreakpoint();
  return (
    <nav className={styles.navbar}>
      <div>
        {currMatch !== 'xs' && <Logo />}
        {window.location.pathname === '/' && currMatch !== 'xs' && (
          <LangSelector />
        )}
      </div>
      <ul>
        <li>
          <NavLink to="/">
            <DecksIcon /> <span>Decks</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/create" state={{ referral: 'navbar' }}>
            <CreateIcon />
            <span>Create</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/quiz">
            <QuizIcon /> <span>Quiz</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile">
            <ProfileIcon /> <span>Profile</span>
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
