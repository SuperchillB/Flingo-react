import React from 'react';
import styles from './styles.module.scss';

const InputField = ({
  type = 'text',
  id = '',
  value = '',
  placeholder = '',
  onChangeHandler = () => {},
  onBlurHandler = () => {},
  classNames = '',
}) => (
  <label className={`${styles.customInput} ${classNames}`} htmlFor={id}>
    {type === 'textarea' ? (
      <textarea
        id={id}
        name={id}
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
    ) : (
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
    )}
    <span></span>
  </label>
);

export default InputField;
