import Good from './Good';

interface Goods {
  getAll: () => Promise<Good[]>;
  update: (good: Good) => Promise<void>;
}

export default interface Api {
  goods: Goods;
}
