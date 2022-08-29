import Good from '../../types/Good';

import { useContext } from 'react';

import Card from '../Card';
import SkeletonCard from '../SkeletonCard';
import Search from '../Search';
import { Context } from '../../Store';

import './Goods.scss';

const Goods = () => {
  const { goods, onSearchChange, searchValue } = useContext(Context);

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
