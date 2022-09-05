import {
  goodAddedToCart,
  goodRemovedFromCart,
  goodAddedToLiked,
  goodRemovedFromLiked,
} from '../../features/goods/goodsSlice';
import Good from '../../types/Good';
import classNames from 'classnames';

import { ReactComponent as LikeIcon } from '../../assets/icons/like.svg';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';
import { ReactComponent as TickIcon } from '../../assets/icons/tick.svg';

import prettyPrice from '../../helpers/prettyPrice';
import './Card.scss';
import { useAppDispatch } from '../../app/hooks';

interface Props {
  disabled?: boolean;
  card: Good;
}

const Card = ({ disabled = false, card }: Props) => {
  const dispatch = useAppDispatch();

  const addToCart = () => dispatch(goodAddedToCart(card.id));
  const removeFromCart = () => dispatch(goodRemovedFromCart(card.id));
  const addToLiked = () => dispatch(goodAddedToLiked(card.id));
  const removeFromLiked = () => dispatch(goodRemovedFromLiked(card.id));

  const likeBtnClass = 'like-button';
  const addBtnClass = 'add-button';

  const likeBtnOption = { 'like-button_active': card.isLiked };
  const addBtnOption = { 'add-button_active': card.isAdded };

  const likeBtnClasses = classNames(likeBtnClass, likeBtnOption);
  const addBtnClasses = classNames(addBtnClass, addBtnOption);

  const likeBtn = (
    <button
      className={likeBtnClasses}
      onClick={card.isLiked ? () => removeFromLiked() : () => addToLiked()}
      data-testid="fav-add-button"
    >
      <LikeIcon className="like-button__svg" />
    </button>
  );

  const addBtn = (
    <button
      className={addBtnClasses}
      onClick={card.isAdded ? () => removeFromCart() : () => addToCart()}
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
