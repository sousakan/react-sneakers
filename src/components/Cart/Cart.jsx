import { useContext, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';

import { Context } from '../../Store';
import Bar from '../Bar';
import Button from '../Button';
import Empty from '../Empty';

import prettyPrice from '../../helpers/prettyPrice';
import calcTax from '../../helpers/calcTax';

import boxImage from '../../assets/images/box.png';
import orderImage from '../../assets/images/order_completed.jpg';
import './Cart.scss';

const Cart = () => {
  const {
    goods,
    removeFromCart,
    isCartOpen,
    setIsCartOpen,
    totalPrice,
    addToOrders,
    orderNumber,
  } = useContext(Context);
  const [isOrdered, setIsOrdered] = useState(false);
  const intervalRef = useRef();

  const cartClasses = classNames('cart', { cart_active: isCartOpen });
  const addedGoods = goods.filter((e) => e.isAdded);

  const buy = () => {
    setIsOrdered(true);
    addToOrders(addedGoods);
  };
  const closeCart = () => {
    setIsCartOpen(false);
    intervalRef.current = setTimeout(() => setIsOrdered(false), 500);
  };

  const bars = addedGoods.map((bar) => (
    <Bar
      className="cart__item"
      id={bar.id}
      name={bar.name}
      price={bar.price}
      isLiked={bar.isLiked}
      isAdded={bar.isAdded}
      url={bar.url}
      onRemove={removeFromCart}
      key={bar.id}
    />
  ));

  const notEmptyContent = (
    <>
      <main className="cart__main">
        <div className="cart__list">{bars}</div>
      </main>
      <footer className="cart__footer">
        <div className="cart__info">
          <span className="cart__text">Итого:</span>
          <span className="cart__dash"></span>
          <span className="cart__price">{prettyPrice(totalPrice)}</span>
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
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
  }, [isCartOpen]);

  useEffect(() => {
    return () => clearTimeout(intervalRef.current);
  }, []);

  return (
    <div className={cartClasses}>
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
