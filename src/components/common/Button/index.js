import React from 'react';
import styles from './styles.module.scss';

const Button = ({
  children,
  classNames = '',
  onClickHandler = () => {},
  type = 'button',
  isDisabled = false,
  size = 'normal',
  value = '',
}) => (
  <button
    className={`${styles.customButton} ${size}`}
    onClick={onClickHandler}
    type={type}
    disabled={isDisabled}
    value={value}
  >
    {children}
  </button>
);

export default Button;
