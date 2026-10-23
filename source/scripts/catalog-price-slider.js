function initRangeInput(
  component,
  sliderLeftSelector = '.component__input-range-sliderLeft',
  sliderRightSelector = '.component__inputRange-sliderRight',
  textLeftSelector = '.component__inputRange-textLeft',
  textRightSelector = '.component__inputRange-textRight',
  rangeSelector = '.component__inputRange-progress',
) {
  if (!component) {
    return;
  }

  const priceGap = 100;
  // Ширина кружка из вашего SCSS (height: 24px; width: 24px;)
  // Нужна для точного центрирования линии прогресса.
  const thumbWidth = 24;

  const sliderLeft = component.querySelector(sliderLeftSelector);
  const sliderRight = component.querySelector(sliderRightSelector);

  const textLeft = component.querySelector(textLeftSelector);
  const textRight = component.querySelector(textRightSelector);

  const range = component.querySelector(rangeSelector);

  if (!sliderLeft || !sliderRight || !textLeft || !textRight || !range) {
    return;
  }

  // Функция обновления визуальной линии прогресса
  const updateProgress = () => {
    const minValue = parseInt(sliderLeft.value, 10);
    const maxValue = parseInt(sliderRight.value, 10);

    const minPercent = (minValue / sliderLeft.max) * 100;
    const maxPercent = (maxValue / sliderRight.max) * 100;

    // Высчитываем поправку на половину ширины кружка
    const leftOffset = (thumbWidth / 2) - ((minPercent / 100) * thumbWidth);
    const rightPercent = 100 - maxPercent;
    const rightOffset = (thumbWidth / 2) - ((rightPercent / 100) * thumbWidth);

    // Применяем стили, чтобы линия начиналась и заканчивалась ровно под центрами кружков
    range.style.left = `calc(${minPercent}% + ${leftOffset}px)`;
    range.style.right = `calc(${rightPercent}% + ${rightOffset}px)`;
  };

  // 1. Ввод в левое текстовое поле
  textLeft.addEventListener('input', () => {
    const minValue = parseInt(textLeft.value, 10);
    const maxValue = parseInt(textRight.value, 10);

    // Защита: если поле пустое (NaN)
    if (isNaN(minValue)) {
      return;
    }

    if (maxValue - minValue >= priceGap && minValue >= 0) {
      sliderLeft.value = minValue;
      updateProgress();
    }
  });

  // 2. Ввод в правое текстовое поле
  textRight.addEventListener('input', () => {
    const minValue = parseInt(textLeft.value, 10);
    const maxValue = parseInt(textRight.value, 10);

    // Защита: если поле пустое (NaN)
    if (isNaN(maxValue)) {
      return;
    }

    if (maxValue - minValue >= priceGap && maxValue <= sliderRight.max) {
      sliderRight.value = maxValue;
      updateProgress();
    }
  });

  // 3. Движение левого ползунка
  sliderLeft.addEventListener('input', () => {
    const minValue = parseInt(sliderLeft.value, 10);
    const maxValue = parseInt(sliderRight.value, 10);

    if (maxValue - minValue < priceGap) {
      // Не даем ползункам пересечься
      sliderLeft.value = maxValue - priceGap;
    } else {
      // Синхронизируем текстовые поля
      textLeft.value = minValue;
      textRight.value = maxValue;
      updateProgress();
    }
  });

  // 4. Движение правого ползунка
  sliderRight.addEventListener('input', () => {
    const minValue = parseInt(sliderLeft.value, 10);
    const maxValue = parseInt(sliderRight.value, 10);

    if (maxValue - minValue < priceGap) {
      // Не даем ползункам пересечься
      sliderRight.value = minValue + priceGap;
    } else {
      // Синхронизируем текстовые поля
      textLeft.value = minValue;
      textRight.value = maxValue;
      updateProgress();
    }
  });

  // Первичная отрисовка линии при загрузке страницы
  updateProgress();
}

export default initRangeInput;
