import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination],

  // Optional parameters
  rewind: 3,
  direction: 'horizontal',
  slidesPerView: 1,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.hero__slider-toggle--next',
    prevEl: '.hero__slider-toggle--prev',
  },
});

export { swiper };
