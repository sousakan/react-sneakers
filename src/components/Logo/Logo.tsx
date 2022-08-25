import { Link } from 'react-router-dom';

import icon from '../../assets/icons/logo_icon.svg';
import './Logo.scss';

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img className="logo__icon" src={icon} alt="logo" />
      <div className="logo__content">
        <h3 className="logo__title">REACT SNEAKERS</h3>
        <h4 className="logo__subtitle">Магазин лучших кроссовок</h4>
      </div>
    </Link>
  );
};

export default Logo;
