const initHeaderDropdown = () => {
  const toggleElement = document.querySelector('.header__menu-button');
  const menuElement = document.querySelector('.header__menu-dropdown');

  if (!menuElement || !toggleElement) {
    return;
  }

  // ЗАЩИТА: Если обработчик уже навешен, второй раз не навешиваем
  if (toggleElement.dataset.listenerAttached === 'true') {
    return;
  }
  toggleElement.dataset.listenerAttached = 'true';

  // 1. Открытие/закрытие бургера
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

    if (window.innerWidth < 768) {
      return;
    }

    const left = el.offsetLeft;
    const width = el.offsetWidth;
    menuList.style.setProperty('--line-left', `${left}px`);
    menuList.style.setProperty('--line-width', `${width}px`);
  };

  links.forEach((link) => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Логика якорей (плавный скролл)
      if (href && href.startsWith('#')) {
        if (href === '#') {
          e.preventDefault();
        } else {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }

      // Переключение активного класса
      links.forEach((l) => l.classList.remove('header__menu-link--active'));
      this.classList.add('header__menu-link--active');
      moveLine(this);

      // Закрываем мобильное меню после клика по ссылке
      menuElement.classList.remove('header__menu-dropdown--opened');
    });
  });

  // Установка линии при загрузке
  const activeLink = menuList.querySelector('.header__menu-link--active');
  document.fonts.ready.then(() => {
    moveLine(activeLink);
  });

  // Пересчет линии при ресайзе
  window.addEventListener('resize', () => {
    const currentActive = menuList.querySelector('.header__menu-link--active');
    moveLine(currentActive);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initHeaderDropdown();
});

export { initHeaderDropdown };
