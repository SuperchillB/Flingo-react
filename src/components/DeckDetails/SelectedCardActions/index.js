import React from 'react';
import NoQuiz from '../../../assets/flingo-icons-no-quiz.svg';
import MoveTo from '../../../assets/flingo-icons-export.svg';
import Trash from '../../../assets/flingo-icons-bin.svg';
import styles from './styles.module.scss';
import Tooltip from '../../common/Tooltip';

const SelectedCardActions = () => {
  const noQuizHandler = () => {
    console.log('no quiz');
  };

  const moveToHandler = () => {
    console.log('move to deck');
  };

  const trashHandler = () => {
    console.log('delete card(s)');
  };

  return (
    <ul className={styles.cardActions}>
      <li>
        <Tooltip text="Hide from quiz" position="top" />
        <NoQuiz onClick={noQuizHandler} />
      </li>
      <li>
        <Tooltip text="Move to deck" position="top" />
        <MoveTo onClick={moveToHandler} />
      </li>
      <li>
        <Tooltip text="Delete" position="top" />
        <Trash onClick={trashHandler} />
      </li>
    </ul>
  );
};

export default SelectedCardActions;
