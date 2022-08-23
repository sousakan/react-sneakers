import classNames from 'classnames';

import './Container.scss';

const Container = ({ children, isSmall = false }) => {
  const classes = classNames('container', { container_small: isSmall });
  return <div className={classes}>{children}</div>;
};

export default Container;
