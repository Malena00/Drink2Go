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

  textLeft.addEventListener('input', () => {
    const minValue = parseInt(textLeft.value, 10);
    const maxValue = parseInt(textRight.value, 10);

    if (maxValue - minValue >= priceGap && maxValue <= sliderRight.max) {
      sliderLeft.value = minValue;
      range.style.left = `${(minValue / sliderLeft.max) * 100 }%`;
    }
  });

  textRight.addEventListener('input', () => {
    const minValue = parseInt(textLeft.value, 10);
    const maxValue = parseInt(textRight.value, 10);

    if (maxValue - minValue >= priceGap && maxValue <= sliderRight.max) {
      sliderRight.value = maxValue;
      range.style.right = `${100 - (maxValue / sliderRight.max) * 100 }%`;
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
      range.style.left = `${(minValue / sliderLeft.max) * 100 }%`;
      range.style.right = `${100 - (maxValue / sliderRight.max) * 100 }%`;
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
      range.style.left = `${(minValue / sliderLeft.max) * 100 }%`;
      range.style.right = `${100 - (maxValue / sliderRight.max) * 100 }%`;
    }
  });
}

export default initRangeInput;
