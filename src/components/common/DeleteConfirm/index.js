import React from 'react';
import Button from '../Button';
import styles from './styles.module.scss';

const DeleteConfirm = ({
  label,
  onDelete,
  onCancel,
  buttonVal = 'DELETE_CARD',
}) => (
  <div className={styles.deleteConfirm}>
    <p>{label}</p>
    <div>
      <Button
        onClickHandler={(e) =>
          onDelete({ actionType: e.target.value, event: e })
        }
        type="button"
        isDisabled={false}
        value={buttonVal}
      >
        Confirm
      </Button>
      <Button
        onClickHandler={onCancel}
        type="button"
        style="no-bg"
        isDisabled={false}
      >
        Cancel
      </Button>
    </div>
  </div>
);

export default DeleteConfirm;
