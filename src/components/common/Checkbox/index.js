import React, { useState } from 'react';
import styles from './styles.module.scss';

const Checkbox = ({
  idAttr = '',
  label = '',
  value = '',
  onClickHandler = () => {},
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const checkHandler = (e) => {
    setIsChecked(e.target.checked);
    onClickHandler(e);
  };

  return (
    <div
      className={`${styles.checkboxContainer} ${
        isChecked ? styles.selected : ''
      }`}
    >
      <input
        className={styles.checkboxInput}
        id={idAttr}
        name={idAttr}
        type="checkbox"
        value={value}
        onClick={checkHandler}
      />
      <label htmlFor={idAttr}>{label}</label>
    </div>
  );
};

export default Checkbox;
