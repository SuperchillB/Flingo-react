import React, { useState, useContext, useEffect } from 'react';
import CardListItem from '../CardListItem';
import { store } from '../../../store';
import styles from './styles.module.scss';
import { deckState } from '../../../containers/App';

const CardsList = ({ deck = { cards: [] } }) => {
  const { state, dispatch } = useContext(store);
  const { deckContext, updateContext } = useContext(deckState);
  // const [cards, setCards] = useState(deck.cards);

  // console.log(deck, cards);

  const selectCardHandler = (isSelected, id) => {
    if (isSelected) {
      // setDeckContext((prevContext) => ({
      //   ...prevContext,
      //   isSelected: [...isSelected, id],
      // }));
      updateContext('selectedCards', [...deckContext.selectedCards, id]);
      // updateContext('selectedCards', [id]);
    } else {
      const updatedIsSelected = deckContext.selectedCards.filter(
        (item) => item !== id,
      );
      // setDeckContext((prevContext) => ({
      //   ...prevContext,
      //   isSelected: updatedIsSelected,
      // }));
      updateContext('selectedCards', updatedIsSelected);
    }
    // const editMode = cards.some((card) => card.isSelected);
  };

  // useEffect(() => {
  //   const cardsList = deck.cards.map((card) => ({
  //     ...card,
  //     isSelected: false,
  //   }));
  //   setCards(cardsList);
  //   console.log(
  //     'watch',
  //     cards.some((card) => card.isSelected),
  //   );
  //   setDeckContext({
  //     ...deckContext,
  //     editMode: cards.some((card) => card.isSelected),
  //   });
  // }, [deck.cards]);

  return (
    <ul className={styles.cardList}>
      {deck.cards &&
        deck.cards.map((card) => (
          <CardListItem
            key={card.id}
            card={card}
            onSelectCard={selectCardHandler}
          />
        ))}
    </ul>
    // <ul className={styles.cardList}>
    //   {cards.map((card) => (
    //     <CardListItem
    //       key={card.id}
    //       card={card}
    //       onSelectCard={selectCardHandler}
    //     />
    //   ))}
    // </ul>
  );
};

export default CardsList;
