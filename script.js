const progressBlock = document.querySelector('#progress-container__bar');
const progressBarLine = document.querySelector('#progress-container__progress-circle');
const progressBarLineRadius = progressBarLine.r.baseVal.value;
const progressBarLineLength = 2 * Math.PI * progressBarLineRadius;
progressBarLine.style.strokeDasharray = `${progressBarLineLength} ${progressBarLineLength}`;
progressBarLine.style.strokeDashoffset = progressBarLineLength;
const progressPercentInput = document.querySelector('#progress-container__value-input');
const togglerAnimation = document.querySelector('#progress-container__animate-toggle');
const togglerHide = document.querySelector('#progress-container__hide-toggle');


//добавить ограничители 0-100
const setProgressPercent = (percent) => {
  progressBarLine.style.strokeDashoffset = progressBarLineLength - percent / 100 * progressBarLineLength;
}
setProgressPercent(+progressPercentInput.value);



progressPercentInput.addEventListener('change', () => {
  setProgressPercent(+progressPercentInput.value);
});

togglerAnimation.addEventListener('change', (event) => {
  if (event.target.checked) {
    progressBarLine.classList.add('progress-container__progress-circle-animated');
  } else {
    progressBarLine.classList.remove('progress-container__progress-circle-animated');
  }
});

// хорошо бы сделать через hidden, добившись отсутствия смещения
togglerHide.addEventListener('change', (event) => {
  if (event.target.checked) {
    progressBlock.style.opacity = 0;
  } else {
    progressBlock.style.opacity = 1;
  }
});
