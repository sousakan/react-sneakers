import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Context } from '../../Store';
import { ReactComponent as BasketIcon } from '../../assets/icons/basket.svg';
import { ReactComponent as LikeIcon } from '../../assets/icons/nav_like.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/profile.svg';
import prettyPrice from '../../helpers/prettyPrice';

import './Navigation.scss';

const Navigation = () => {
  const { setIsCartOpen, totalPrice } = useContext(Context);

  const openCart = () => setIsCartOpen(true);

  return (
    <nav className="nav" role="navigation">
      <button className="nav__button" onClick={openCart}>
        <BasketIcon className="nav__icon" />
        <span className="nav__price" data-testid="total-sum">
          {prettyPrice(totalPrice)}
        </span>
      </button>
      <Link to="/favorites" className="nav__link">
        <LikeIcon className="nav__icon" />
      </Link>
      <Link to="/orders" className="nav__link">
        <ProfileIcon className="nav__icon" />
      </Link>
    </nav>
  );
};

export default Navigation;
