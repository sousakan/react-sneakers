import Good from '../../types/Good';

import { Link, useNavigate } from 'react-router-dom';

import Empty from '../Empty';
import Card from '../Card';
import BackIcon from '../../assets/icons/back_button.svg';
import EmojiImg from '../../assets/images/orders_emoji.png';
import './Orders.scss';
import { useAppSelector } from '../../app/hooks';

const Orders = () => {
  const orderedGoods = useAppSelector((state) => state.orders);
  const navigate = useNavigate();

  const goHome = () => navigate('/');

  const goods = orderedGoods.map((card: Good) => {
    return <Card card={card} disabled key={card.id} />;
  });

  const content = (
    <div className="orders">
      <header className="orders__header">
        <Link to="/" className="orders__link">
          <img className="orders__icon" src={BackIcon} alt="home button" />
        </Link>
        <h2 className="orders__title">Мои покупки</h2>
      </header>
      <main className="orders__goods">{goods}</main>
    </div>
  );

  const emptyContent = (
    <main className="orders__wrapper">
      <Empty
        url={EmojiImg}
        title={'У вас нет заказов'}
        info={'Оформите хотя бы один заказ'}
        onClick={goHome}
        isSmall
      />
    </main>
  );

  return goods.length ? content : emptyContent;
};

export default Orders;
