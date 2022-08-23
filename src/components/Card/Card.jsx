import { useContext } from 'react';

import classNames from 'classnames';

import { ReactComponent as LikeIcon } from '../../assets/icons/like.svg';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';
import { ReactComponent as TickIcon } from '../../assets/icons/tick.svg';

import prettyPrice from '../../helpers/prettyPrice';
import { Context } from '../../Store';

import './Card.scss';

const Card = ({ disabled, ...card }) => {
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
    >
      {card.isAdded ? <TickIcon /> : <PlusIcon className="add-button__svg" />}
    </button>
  );

  return (
    <div className="card" tabIndex="0" role="listitem">
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
