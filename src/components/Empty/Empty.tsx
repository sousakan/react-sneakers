import classNames from 'classnames';

import Button from '../Button';

import './Empty.scss';

interface Props {
  url: string,
  title: string,
  info: string,
  isSmall?: boolean,
  isCompleted?: boolean,
  onClick: () => void,
}

const Empty = ({
  url,
  title,
  info,
  isSmall = false,
  isCompleted = false,
  onClick,
}: Props) => {
  const imgOption = { empty__img_small: isSmall, empty__img_rect: isCompleted };
  const titleOption = { empty__title_active: isCompleted };

  const imgClasses = classNames('empty__img', imgOption);
  const titleClasses = classNames('empty__title', titleOption);

  return (
    <div className="empty">
      <img className={imgClasses} src={url} alt="" />
      <h2 className={titleClasses}>{title}</h2>
      <p className="empty__info">{info}</p>
      <Button className="button_back" onClick={onClick}>
        Вернуться назад
      </Button>
    </div>
  );
};

export default Empty;
