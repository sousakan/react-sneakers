import Good from '../../types/Good';

import { Link, useNavigate } from 'react-router-dom';

import Empty from '../Empty';
import Card from '../Card';
import BackIcon from '../../assets/icons/back_button.svg';
import EmojiImg from '../../assets/images/fav_emoji.png';
import './Favorites.scss';
import { useAppSelector } from '../../app/hooks';
import { selectLikedGoods } from '../../features/goods/goodsSlice';

const Favorites = () => {
  const navigate = useNavigate();

  const goHome = () => navigate('/');

  const likedGoods = useAppSelector(selectLikedGoods).map((card: Good) => {
    return <Card card={card} key={card.id} />;
  });

  const content = (
    <>
      <header className="favorites__header">
        <Link to="/" className="favorites__link">
          <img className="favorites__icon" src={BackIcon} alt="home button" />
        </Link>
        <h2 className="favorites__title">Мои закладки</h2>
      </header>
      <main className="favorites__goods">{likedGoods}</main>
    </>
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

  return (
    <div className="favorites" data-testid="favorites">
      {likedGoods.length ? content : emptyContent}
    </div>
  );
};

export default Favorites;
