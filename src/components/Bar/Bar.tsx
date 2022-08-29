import Good from '../../types/Good';

import classNames from 'classnames';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import prettyPrice from '../../helpers/prettyPrice';

import './Bar.scss';

interface Props {
  className?: string;
  good: Good;
  onRemove: (good: Good) => void;
}

const Bar = ({ className, good, onRemove }: Props) => {
  const barClasses = classNames('bar', className);

  return (
    <div
      className={barClasses}
      tabIndex={0}
      role="listitem"
      data-testid={good.id}
    >
      <img className="bar__img" src={good.url} alt="sneakers" />
      <div className="bar__info">
        <p className="bar__name">{good.name}</p>
        <span className="bar__price">{prettyPrice(good.price)}</span>
      </div>
      <button
        className="bar__button"
        onClick={() => onRemove(good)}
        data-testid="bar-remove-button"
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default Bar;
