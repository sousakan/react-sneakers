import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import classNames from 'classnames';

import nextSvg from '../../assets/icons/next_button.svg';

import 'swiper/css';
import 'swiper/css/navigation';
import './Slider.scss';

import sliderImg from '../../assets/images/slider_img.png';

interface Props {
  className: string
}


const Slider = ({ className }: Props) => {
  const classes = classNames('slider', className);

  return (
    <div className={classes}>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.slider__button',
        }}
        loop={true}
      >
        <SwiperSlide>
          <div className="slide">
            <img className="slide__img" src={sliderImg} alt="img1" />
            <div className="slide__content">
              <h1 className="slide__title">
                <span className="slide__span_green">Stan Smith</span>,<br />
                Forever!
              </h1>
              <button className="slide__button">Купить</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide">
            <img className="slide__img" src={sliderImg} alt="img1" />
            <div className="slide__content">
              <h1 className="slide__title">
                <span className="slide__span_green">Stan Smith</span>,<br />
                Forever!
              </h1>
              <button className="slide__button">Купить</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="slider__button">
        <img className="slider__svg" src={nextSvg} alt="next-button" />
      </div>
    </div>
  );
};

export default Slider;
