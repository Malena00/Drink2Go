/* в этот файл добавляет скрипты */

import { initHeaderDropdown } from './header-dropdown.js';
import '../vendor/swiper/swiper.js';
import initRangeInput from './catalog-price-slider.js';
import initMap from './map.js';

initHeaderDropdown();
initRangeInput(document.querySelector('.component__input-range-price'));
initMap();
