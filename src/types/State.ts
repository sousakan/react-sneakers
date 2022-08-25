import Good from "./Good";

export default interface State {
  goods: Good[],
  addToCart: (good: Good) => void,
  removeFromCart: (good: Good) => void,
  addToLiked: (good: Good) => void,
  removeFromLiked: (good: Good) => void,
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  searchValue: string,
  isCartOpen: boolean,
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>,
  totalPrice: number,
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>,
  orderedGoods: Good[],
  addToOrders: (goods: Good[]) => void,
  orderNumber: number,
}