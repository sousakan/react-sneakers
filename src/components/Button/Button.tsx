import classNames from 'classnames';

import './Button.scss';

interface Props {
  children: string,
  className: string,
  onClick: () => void
}

const Button = ({ children, className, onClick }: Props) => {
  const btnClasses = classNames('button', className);

  return (
    <button className={btnClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
