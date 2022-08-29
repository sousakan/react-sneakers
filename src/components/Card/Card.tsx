import Good from '../../types/Good';

import { useContext } from 'react';
import classNames from 'classnames';

import { ReactComponent as LikeIcon } from '../../assets/icons/like.svg';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';
import { ReactComponent as TickIcon } from '../../assets/icons/tick.svg';

import prettyPrice from '../../helpers/prettyPrice';
import { Context } from '../../Store';

import './Card.scss';

interface Props {
  disabled?: boolean;
  card: Good;
}

const Card = ({ disabled = false, card }: Props) => {
  const { addToCart, removeFromCart, addToLiked, removeFromLiked } =
    useContext(Context);

  const likeBtnClass = 'like-button';
  const addBtnClass = 'add-button';

  const likeBtnOption = { 'like-button_active': card.isLiked };
  const addBtnOption = { 'add-button_active': card.isAdded };

  const likeBtnClasses = classNames(likeBtnClass, likeBtnOption);
  const addBtnClasses = classNames(addBtnClass, addBtnOption);

  const likeBtn = (
    <button
      className={likeBtnClasses}
      onClick={
        card.isLiked ? () => removeFromLiked(card) : () => addToLiked(card)
      }
      data-testid="fav-add-button"
    >
      <LikeIcon className="like-button__svg" />
    </button>
  );

  const addBtn = (
    <button
      className={addBtnClasses}
      onClick={
        card.isAdded ? () => removeFromCart(card) : () => addToCart(card)
      }
      data-testid="cart-add-button"
    >
      {card.isAdded ? <TickIcon /> : <PlusIcon className="add-button__svg" />}
    </button>
  );

  return (
    <div className="card" role="gridcell" data-testid={card.id}>
      {!disabled && likeBtn}
      <img className="card__img" src={card.url} alt="sneakers" />
      <h3 className="card__name">{card.name}</h3>
      <div className="card__bottom">
        <div className="card__price">
          <span className="card__text">ЦЕНА:</span>
          <div className="card__value">{prettyPrice(card.price)}</div>
        </div>
        {!disabled && addBtn}
      </div>
    </div>
  );
};

export default Card;
