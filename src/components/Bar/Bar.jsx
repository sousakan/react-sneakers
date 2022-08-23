import classNames from 'classnames';

import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import prettyPrice from '../../helpers/prettyPrice';

import './Bar.scss';

const Bar = ({ className, onRemove, ...bar }) => {
  const barClasses = classNames('bar', className);

  return (
    <div className={barClasses}>
      <img className="bar__img" src={bar.url} alt="sneakers" />
      <div className="bar__info">
        <p className="bar__name">{bar.name}</p>
        <span className="bar__price">{prettyPrice(bar.price)}</span>
      </div>
      <button className="bar__button" onClick={() => onRemove(bar)}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default Bar;
