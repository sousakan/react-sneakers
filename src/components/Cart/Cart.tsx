import Good from '../../types/Good';
import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import Bar from '../Bar';
import Button from '../Button';
import Empty from '../Empty';
import prettyPrice from '../../helpers/prettyPrice';
import calcTax from '../../helpers/calcTax';
import boxImage from '../../assets/images/box.png';
import orderImage from '../../assets/images/order_completed.jpg';
import './Cart.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  goodRemovedFromCart,
  goodsRemovedFromCart,
  selectGoodsInCart,
} from '../../features/goods/goodsSlice';
import { ordersAdded } from '../../features/orders/ordersSlice';
import {
  cartClosed,
  orderNumberIncremented,
} from '../../features/cart/cartSlice';

const Cart = () => {
  const [isOrdered, setIsOrdered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const dispatch = useAppDispatch();

  const addedGoods = useAppSelector(selectGoodsInCart);
  const isCartOpened = useAppSelector((state) => state.cart.isCartOpen);
  const orderNumber = useAppSelector((state) => state.cart.orderNumber);

  const totalPrice = addedGoods.reduce((acc, v) => acc + v.price, 0);

  const removeFromCart = (card: Good) => dispatch(goodRemovedFromCart(card.id));

  const cartClasses = classNames('cart', { cart_active: isCartOpened });

  const buy = () => {
    setIsOrdered(true);
    dispatch(orderNumberIncremented());
    dispatch(ordersAdded(addedGoods));
    dispatch(goodsRemovedFromCart(addedGoods));
  };
  const closeCart = () => {
    dispatch(cartClosed());
    intervalRef.current = setTimeout(() => setIsOrdered(false), 500);
  };

  const bars = addedGoods.map((bar: Good) => (
    <Bar
      className="cart__item"
      good={bar}
      onRemove={removeFromCart}
      key={bar.id}
    />
  ));

  const notEmptyContent = (
    <>
      <main className="cart__main">
        <div className="cart__list" role="list">
          {bars}
        </div>
      </main>
      <footer className="cart__footer">
        <div className="cart__info">
          <span className="cart__text">Итого:</span>
          <span className="cart__dash"></span>
          <span className="cart__price" data-testid="total-sum">
            {prettyPrice(totalPrice)}
          </span>
        </div>
        <div className="cart__info">
          <span className="cart__text">Налог 5%:</span>
          <span className="cart__dash"></span>
          <span className="cart__price">
            {prettyPrice(calcTax(totalPrice))}
          </span>
        </div>
        <Button className="button_pay" onClick={buy}>
          Оформить заказ
        </Button>
      </footer>
    </>
  );

  const emptyContent = (
    <main className="cart__wrapper">
      <Empty
        url={boxImage}
        title={'Корзина пустая'}
        info={'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
        onClick={closeCart}
      />
    </main>
  );

  const orderedContent = (
    <main className="cart__wrapper">
      <Empty
        url={orderImage}
        title={'Заказ оформлен'}
        info={`Ваш заказ #${orderNumber} скоро будет передан курьерской доставке`}
        onClick={closeCart}
        isCompleted
      />
    </main>
  );

  const content = addedGoods.length ? notEmptyContent : emptyContent;

  useEffect(() => {
    document.body.style.overflow = isCartOpened ? 'hidden' : '';
  }, [isCartOpened]);

  useEffect(() => {
    return () => clearTimeout(intervalRef.current);
  }, []);

  return (
    <div className={cartClasses} data-testid="cart">
      <div className="cart__overlay" onClick={closeCart}></div>
      <div className="cart__content">
        <h2 className="cart__title">Корзина</h2>
        <div className="cart__container">
          {isOrdered ? orderedContent : content}
        </div>
      </div>
    </div>
  );
};

export default Cart;
