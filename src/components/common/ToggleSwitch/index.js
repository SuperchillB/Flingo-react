import React, { useState } from 'react';
import styles from './styles.module.scss';

const ToggleSwitch = ({
  idAttr = '',
  labelLeft = '',
  labelRight = '',
  value = '',
  type = 'single',
  onClickHandler = () => {},
}) => {
  // const [isChecked, setIsChecked] = useState(!(type === 'single'));
  const [isChecked, setIsChecked] = useState(false);

  const switchHandler = (e) => {
    setIsChecked(e.target.checked);
    onClickHandler(e);
  };

  return (
    <div className={styles.toggleSwitchContainer}>
      {type === 'single' && (
        <>
          <label htmlFor={idAttr}>{labelLeft}</label>
          <input
            className={styles.toggleSwitchInput}
            id={idAttr}
            type="checkbox"
            onClick={switchHandler}
          />
        </>
      )}
      {type === 'double' && (
        <>
          <label>{labelLeft}</label>
          <input
            className={`${styles.toggleSwitchInput} ${styles.double}`}
            id={idAttr}
            type="checkbox"
            onClick={switchHandler}
            onChange={() => {}}
            defaultChecked
          />
          <label>{labelRight}</label>
        </>
      )}
    </div>
  );
};

export default ToggleSwitch;
