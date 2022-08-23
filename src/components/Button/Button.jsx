import classNames from 'classnames';

import './Button.scss';

const Button = ({ children, className, onClick }) => {
  const btnClasses = classNames('button', className);

  return (
    <button className={btnClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
