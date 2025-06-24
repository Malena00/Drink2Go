const toggleElement = document.querySelector('.header__menu-button');
const menuElement = document.querySelector('.header__menu-dropdown');

const onMenuElementClick = () => {
  menuElement.classList.toggle('header__menu-dropdown--opened');
};

const initHeaderDropdown = () => {
  toggleElement.addEventListener('click', onMenuElementClick);
};

export {initHeaderDropdown};
