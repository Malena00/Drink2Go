function initRangeInput(
  component,
  sliderLeftSelector = '.component__input-range-sliderLeft',
  sliderRightSelector = '.component__inputRange-sliderRight',
  textLeftSelector = '.component__inputRange-textLeft',
  textRightSelector = '.component__inputRange-textRight',
  rangeSelector = '.component__inputRange-progress',
) {
  const priceGap = 100;

  const sliderLeft = component.querySelector(sliderLeftSelector);
  const sliderRight = component.querySelector(sliderRightSelector);

  const textLeft = component.querySelector(textLeftSelector);
  const textRight = component.querySelector(textRightSelector);

  const range = component.querySelector(rangeSelector);

  // Новая функция для обновления линии прогресса
  const updateProgress = () => {
    const minValue = parseInt(sliderLeft.value, 10);
    const maxValue = parseInt(sliderRight.value, 10);

    const minPercent = (minValue / sliderLeft.max) * 100;
    const maxPercent = (maxValue / sliderRight.max) * 100;

    // Устанавливаем чистые проценты без всяких calc()
    range.style.left = `${minPercent}%`;
    range.style.right = `${100 - maxPercent}%`;
  };

  // --- Обработчики ---

  textLeft.addEventListener('input', () => {
    const minValue = parseInt(textLeft.value, 10);
    const maxValue = parseInt(textRight.value, 10);

    if (maxValue - minValue >= priceGap && maxValue <= sliderRight.max) {
      sliderLeft.value = minValue;
      updateProgress(); // Вызываем нашу функцию
    }
  });

  textRight.addEventListener('input', () => {
    const minValue = parseInt(textLeft.value, 10);
    const maxValue = parseInt(textRight.value, 10);

    if (maxValue - minValue >= priceGap && maxValue <= sliderRight.max) {
      sliderRight.value = maxValue;
      updateProgress(); // Вызываем нашу функцию
    }
  });

  sliderLeft.addEventListener('input', () => {
    const minValue = parseInt(sliderLeft.value, 10);
    const maxValue = parseInt(sliderRight.value, 10);

    if (maxValue - minValue < priceGap) {
      sliderLeft.value = maxValue - priceGap;
    } else {
      textLeft.value = minValue;
      textRight.value = maxValue;
      updateProgress(); // Вызываем нашу функцию
    }
  });

  sliderRight.addEventListener('input', () => {
    const minValue = parseInt(sliderLeft.value, 10);
    const maxValue = parseInt(sliderRight.value, 10);

    if (maxValue - minValue < priceGap) {
      sliderRight.value = minValue + priceGap;
    } else {
      textLeft.value = minValue;
      textRight.value = maxValue;
      updateProgress(); // Вызываем нашу функцию
    }
  });

  // Желательно вызвать один раз при инициализации, чтобы линия встала на место
  updateProgress();
}

export default initRangeInput;
