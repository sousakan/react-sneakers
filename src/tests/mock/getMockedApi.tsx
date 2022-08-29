import Good from '../../types/Good';

export default function getMockedApi(goodsArr: Good[]) {
  return {
    goods: {
      getAll: () => Promise.resolve(goodsArr),
      update: (good: Good) => Promise.resolve(),
    },
  };
}
