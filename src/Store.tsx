import Good from './types/Good';
import State from './types/State';

import React from 'react';
import { useState, useEffect } from 'react';

import api from './api';
import calcTotalPrice from './helpers/calcTotalPrice';

export const Context = React.createContext<State>(null!);

const ADD_TO_CART_ERR = 'Ошибка добавления товара в корзину';
const RM_FROM_CART_ERR = 'Ошибка удаления товара из корзины';
const ADD_TO_LIKED_ERR = 'Ошибка добавления товара в избранное';
const RM_FROM_LIKED_ERR = 'Ошибка удаления товара из избранного';
const GOODS_LOAD_ERR = 'Ошибка загрузки товаров';

interface Props {
  children: JSX.Element
}

const Store = ({ children }: Props) => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [orderedGoods, setOrderedGoods] = useState<Good[]>([]);
  const [orderNumber, setOrderNumber] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  function updateLocalGood(updGood: Good): void {
    setGoods((prev) => prev.map((e) => (e.id === updGood.id ? updGood : e)));
  }

  function restorePrevLocalGoods(prevGoods: Good[]): void {
    setGoods(prevGoods);
  }

  function updateServerGood(updGood: Good, errorMsg: string): void {
    api.goods.update(updGood).catch((e) => {
      restorePrevLocalGoods(goods);
      alert(errorMsg);
      console.error(e);
    });
  }

  const addToCart = (good: Good): void => {
    const updatedGood = { ...good, isAdded: true };

    updateLocalGood(updatedGood);
    updateServerGood(updatedGood, ADD_TO_CART_ERR);
  };
  const removeFromCart = (good: Good): void => {
    const updatedGood = { ...good, isAdded: false };

    updateLocalGood(updatedGood);
    updateServerGood(updatedGood, RM_FROM_CART_ERR);
  };

  const addToLiked = (good: Good): void => {
    const updatedGood = { ...good, isLiked: true };

    updateLocalGood(updatedGood);
    updateServerGood(updatedGood, ADD_TO_LIKED_ERR);
  };
  const removeFromLiked = (good: Good): void => {
    const updatedGood = { ...good, isLiked: false };

    updateLocalGood(updatedGood);
    updateServerGood(updatedGood, RM_FROM_LIKED_ERR);
  };

  const addToOrders = (goods: Good[]): void => {
    goods.forEach((e) => removeFromCart(e));
    goods.forEach((e) => (e.isAdded = false));
    setOrderedGoods((prev) => [...prev, ...goods]);
    setOrderNumber((prev) => prev + 1);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const state = {
    goods,
    addToCart,
    removeFromCart,
    addToLiked,
    removeFromLiked,
    onSearchChange,
    searchValue,
    isCartOpen,
    setIsCartOpen,
    totalPrice,
    setTotalPrice,
    orderedGoods,
    addToOrders,
    orderNumber,
  };

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const { data } = await api.goods.getAll();

        setGoods(data);
      } catch (e) {
        alert(GOODS_LOAD_ERR);
        console.error(e);
      }
    }

    fetchInitialData();
  }, []);

  useEffect(() => {
    setTotalPrice(calcTotalPrice(goods));
  }, [goods]);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default Store;
