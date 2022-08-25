import classNames from 'classnames';

import './Container.scss';

interface Props {
  children: JSX.Element,
  isSmall?: boolean,
}

const Container = ({ children, isSmall = false }: Props) => {
  const classes = classNames('container', { container_small: isSmall });
  return <div className={classes}>{children}</div>;
};

export default Container;
