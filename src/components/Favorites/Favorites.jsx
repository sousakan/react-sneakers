import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { Context } from '../../Store';

import Empty from '../Empty';
import Card from '../Card';
import BackIcon from '../../assets/icons/back_button.svg';
import EmojiImg from '../../assets/images/fav_emoji.png';
import './Favorites.scss';

const Favorites = () => {
  const { goods } = useContext(Context);
  const navigate = useNavigate();

  const goHome = () => navigate('/');

  const likedGoods = goods
    .filter((e) => e.isLiked)
    .map((card) => {
      return (
        <Card
          id={card.id}
          name={card.name}
          price={card.price}
          isLiked={card.isLiked}
          isAdded={card.isAdded}
          url={card.url}
          key={card.id}
        />
      );
    });

  const content = (
    <div className="favorites">
      <header className="favorites__header">
        <Link to="/" className="favorites__link">
          <img className="favorites__icon" src={BackIcon} alt="home button" />
        </Link>
        <h2 className="favorites__title">Мои закладки</h2>
      </header>
      <main className="favorites__goods">{likedGoods}</main>
    </div>
  );

  const emptyContent = (
    <main className="favorites__wrapper">
      <Empty
        url={EmojiImg}
        title={'Закладок нет'}
        info={'Вы ничего не добавляли в закладки'}
        onClick={goHome}
        isSmall
      />
    </main>
  );

  return likedGoods.length ? content : emptyContent;
};

export default Favorites;
