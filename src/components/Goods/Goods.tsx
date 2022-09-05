import { useAppSelector } from '../../app/hooks';
import Good from '../../types/Good';

import Card from '../Card';
import SkeletonCard from '../SkeletonCard';
import Search from '../Search';

import './Goods.scss';
import { selectAllGoods } from '../../features/goods/goodsSlice';
import { useState } from 'react';

const Goods = () => {
  const goods = useAppSelector(selectAllGoods);
  const [searchValue, setSearchValue] = useState('');

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const cards = goods
    .filter((e: Good) =>
      e.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((card: Good) => {
      return <Card card={card} key={card.id} />;
    });

  const skeletonCards = new Array(8)
    .fill(0)
    .map((_, index) => <SkeletonCard key={index} />);

  return (
    <div className="goods">
      <div className="goods__header">
        <h2 className="goods__title">Все кроссовки</h2>
        <Search onSearchChange={onSearchChange} value={searchValue} />
      </div>
      <div className="goods__catalog" tabIndex={0} role="grid">
        {goods.length ? cards : skeletonCards}
      </div>
    </div>
  );
};

export default Goods;
