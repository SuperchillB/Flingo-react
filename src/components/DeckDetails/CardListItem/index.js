import React, { useState, useContext } from 'react';
import { Link } from '@reach/router';
import styles from './styles.module.scss';
import Checkbox from '../../common/Checkbox';
import NoQuizIcon from '../../../assets/flingo-icons-no-quiz.svg';
import { deckState } from '../../../containers/App';

const CardListItem = ({ card, onSelectCard }) => {
  const { deckContext } = useContext(deckState);
  const [isQuizzed, setIsQuizzed] = useState(true);
  const { id, from, to, fromLang, toLang, quiz } = card;

  return (
    <li className={styles.cardListItem} data-id={id}>
      <Checkbox
        idAttr="selectCard"
        onClickHandler={(e) => onSelectCard(e.target.checked, card.id)}
      />
      {!quiz && <NoQuizIcon />}
      <Link to={`/cards/${id}`} state={{ card }}>
        <div>
          {/* {deckContext.selfTestModeActive &&
            deckContext.selfTestModeHideLeft && (
              <div className={`${styles.hidden} ${styles.fromHidden}`}></div>
            )} */}
          <div
            className={`${
              deckContext.selfTestModeActive &&
              deckContext.selfTestModeHideLeft &&
              styles.showHider
            } ${styles.fromHidden}`}
          ></div>
          <span>{`${from} (${fromLang})`}</span>
        </div>
        <div>
          {/* {deckContext.selfTestModeActive && (
            <div className={`${styles.hidden} ${styles.toHidden}`}></div>
          )} */}
          <div
            className={`${
              deckContext.selfTestModeActive &&
              !deckContext.selfTestModeHideLeft &&
              styles.showHider
            } ${styles.toHidden}`}
          ></div>
          <span>{`${to} (${toLang})`}</span>
        </div>
      </Link>
    </li>
  );
};

export default CardListItem;
