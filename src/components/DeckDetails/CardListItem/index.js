import React, { useState } from 'react';
import { Link } from '@reach/router';
import styles from './styles.module.scss';
import Checkbox from '../../common/Checkbox';
import NoQuiz from '../../../assets/flingo-icons-no-quiz.svg';

const CardListItem = ({ card, onSelectCard }) => {
  const [isQuizzed, setIsQuizzed] = useState(true);
  const { id, from, to, fromLang, toLang } = card;

  return (
    <li className={styles.cardListItem} data-id={id}>
      <Checkbox
        idAttr="selectCard"
        onClickHandler={(e) => onSelectCard(e.target.checked, card.id)}
      />
      {!isQuizzed && <NoQuiz />}
      <Link to={`/cards/${id}`} state={{ card }}>
        <div>
          <span>{`${from} (${fromLang})`}</span>
        </div>
        <div>
          <span>{`${to} (${toLang})`}</span>
        </div>
      </Link>
    </li>
  );
};

export default CardListItem;
