import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination],

  // Optional parameters
  loop: true,
  direction: 'horizontal',
  slidesPerView: 1,
  centeredSlides: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

export { swiper };
