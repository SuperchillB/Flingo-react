import React, { useContext } from 'react';
import SelfTestMode from '../SelfTestMode';
import SelectedCardActions from '../SelectedCardActions';
import SortBy from '../../common/SortBy';
import { deckState } from '../../../containers/App';
import styles from './styles.module.scss';

const CardOptions = () => {
  const { deckContext } = useContext(deckState);

  return (
    <div className={styles.cardOptions}>
      <SelfTestMode />
      <div>
        <SortBy />
      </div>
      {deckContext.selectedCards.length > 0 && <SelectedCardActions />}
    </div>
  );
};

export default CardOptions;
