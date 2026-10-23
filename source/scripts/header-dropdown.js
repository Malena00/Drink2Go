const initHeaderDropdown = () => {
  const toggleElement = document.querySelector('.header__menu-button');
  const menuElement = document.querySelector('.header__menu-dropdown');

  // Если меню нет на странице, прерываем выполнение
  if (!menuElement || !toggleElement) {
    return;
  }

  // 1. Логика открытия/закрытия бургера
  toggleElement.addEventListener('click', () => {
    menuElement.classList.toggle('header__menu-dropdown--opened');
  });

  // 2. Логика бегающей линии
  const menuList = menuElement.querySelector('.header__menu-list');
  if (!menuList) {
    return;
  }

  const links = menuList.querySelectorAll('.header__menu-link');

  const moveLine = (el) => {
    if (!el) {
      return;
    }

    const left = el.offsetLeft;
    const width = el.offsetWidth;

    // ИСПРАВЛЕНО: используем .style вместо computedStyleMap
    menuList.style.setProperty('--line-left', `${left}px`);
    menuList.style.setProperty('--line-width', `${width}px`);
  };

  links.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      links.forEach((l) => l.classList.remove('header__menu-link--active'));

      this.classList.add('header__menu-link--active');
      moveLine(this);
    });
  });

  // Устанавливаем линию на активный пункт при загрузке страницы
  const activeLink = menuList.querySelector('.header__menu-link--active');

  // Ждем загрузки шрифтов, чтобы ширина текста посчиталась правильно
  document.fonts.ready.then(() => {
    moveLine(activeLink);
  });

  // Пересчитываем позицию при ресайзе окна
  window.addEventListener('resize', () => {
    const currentActive = menuList.querySelector('.header__menu-link--active');
    moveLine(currentActive);
  });
};

// Вызываем функцию при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  initHeaderDropdown();
});

export { initHeaderDropdown };
