import React from 'react';
import { Link } from '@reach/router';
import LangSelector from '../LangSelector';
import { useBreakpoint } from '../../../containers/BreakpointProvider';
import styles from './styles.module.scss';

const Logo = () => {
  const { currMatch } = useBreakpoint();

  return (
    <div className={styles.logoContainer}>
      {currMatch === 'xs' && window.location.pathname === '/' && (
        <LangSelector />
      )}
      <Link to="/">
        <span>flingo</span>
      </Link>
    </div>
  );
};

export default Logo;
