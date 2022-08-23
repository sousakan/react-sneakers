import React from 'react';
import { useState, useEffect } from 'react';

import api from './api';
import calcTotalPrice from './helpers/calcTotalPrice';

export const Context = React.createContext();

const ADD_TO_CART_ERR = 'Ошибка добавления товара в корзину';
const RM_FROM_CART_ERR = 'Ошибка удаления товара из корзины';
const ADD_TO_LIKED_ERR = 'Ошибка добавления товара в избранное';
const RM_FROM_LIKED_ERR = 'Ошибка удаления товара из избранного';
const GOODS_LOAD_ERR = 'Ошибка загрузки товаров';

const Store = ({ children }) => {
  const [goods, setGoods] = useState([]);
  const [orderedGoods, setOrderedGoods] = useState([]);
  const [orderNumber, setOrderNumber] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  function updateLocalGood(updGood) {
    setGoods((prev) => prev.map((e) => (e.id === updGood.id ? updGood : e)));
  }

  function restorePrevLocalGoods(prevGoods) {
    setGoods(prevGoods);
  }

  function updateServerGood(updGood, errorMsg) {
    api.goods.update(updGood).catch((e) => {
      restorePrevLocalGoods(goods);
      alert(errorMsg);
      console.error(e);
    });
  }

  const addToCart = (good) => {
    const updatedGood = { ...good, isAdded: true };

    updateLocalGood(updatedGood);
    updateServerGood(updatedGood, ADD_TO_CART_ERR);
  };
  const removeFromCart = (good) => {
    const updatedGood = { ...good, isAdded: false };

    updateLocalGood(updatedGood);
    updateServerGood(updatedGood, RM_FROM_CART_ERR);
  };

  const addToLiked = (good) => {
    const updatedGood = { ...good, isLiked: true };

    updateLocalGood(updatedGood);
    updateServerGood(updatedGood, ADD_TO_LIKED_ERR);
  };
  const removeFromLiked = (good) => {
    const updatedGood = { ...good, isLiked: false };

    updateLocalGood(updatedGood);
    updateServerGood(updatedGood, RM_FROM_LIKED_ERR);
  };

  const addToOrders = (goods) => {
    goods.forEach((e) => removeFromCart(e));
    goods.forEach((e) => (e.isAdded = false));
    setOrderedGoods((prev) => [...prev, ...goods]);
    setOrderNumber((prev) => prev + 1);
  };

  const onSearchChange = (e) => {
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
