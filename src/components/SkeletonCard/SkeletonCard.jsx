import './SkeletonCard.scss';

const SkeletonCard = () => {
  return (
    <div className="skeleton" tabIndex="0" role="listitem">
      <div className="skeleton__img"></div>
      <div className="skeleton__text"></div>
      <div className="skeleton__text skeleton__text_short"></div>
      <div className="skeleton__footer">
        <div className="skeleton__price"></div>
        <div className="skeleton__button"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
