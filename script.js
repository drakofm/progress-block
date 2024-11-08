const progressBlock = document.querySelector('#progress-container__bar');
const progressBarLine = document.querySelector('#progress-container__progress-circle');
const progressBarLineRadius = progressBarLine.r.baseVal.value;
const progressBarLineLength = 2 * Math.PI * progressBarLineRadius;
progressBarLine.style.strokeDasharray = `${progressBarLineLength} ${progressBarLineLength}`;
progressBarLine.style.strokeDashoffset = progressBarLineLength;
const progressPercentInput = document.querySelector('#progress-container__value-input');
const togglerAnimation = document.querySelector('#progress-container__animate-toggle');
const togglerHide = document.querySelector('#progress-container__hide-toggle');



const setProgressPercent = (percent) => {
  percent > 100 ? percent = 100 : percent < 0 ? percent = 0: '';
  progressBarLine.style.strokeDashoffset = progressBarLineLength - percent / 100 * progressBarLineLength;
};
setProgressPercent(+progressPercentInput.value);

// случай, если нужна анимация с отображением прогресса
const switchProgressAnimation = (isChecked) => {
  if (isChecked) {
    progressBarLine.classList.add('progress-container__progress-circle-animated-progress');
  } else {
    progressBarLine.classList.remove('progress-container__progress-circle-animated-progress');
  }
};

// случай, если нужна анимация без отображения прогресса
const switchLoadingAnimation = (isChecked) => {
  if (isChecked) {
    progressBarLine.classList.add('progress-container__progress-circle-animated-loading');
  } else {
    progressBarLine.classList.remove('progress-container__progress-circle-animated-loading');
    setProgressPercent(+progressPercentInput.value);
  }
};

const switchHiding = (isChecked) => {
  if (isChecked) {
    progressBlock.style.opacity = 0;
  } else {
    progressBlock.style.opacity = 1;
  }
};



progressPercentInput.addEventListener('change', () => {
  setProgressPercent(+progressPercentInput.value);
});

togglerAnimation.addEventListener('change', (event) => {
  switchProgressAnimation(event.target.checked);
});

togglerHide.addEventListener('change', (event) => {
  switchHiding(event.target.checked);
});
