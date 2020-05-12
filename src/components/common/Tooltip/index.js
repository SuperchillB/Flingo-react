import React from 'react';
import styles from './styles.module.scss';

const Tooltip = ({ text = '', position = 'top' }) => (
  <span className={styles.tooltip} data-position={position}>
    {text}
  </span>
);

export default Tooltip;
