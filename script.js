const progressBar = document.querySelector('#progress-container__progress-circle');
const progressBarRadius = progressBar.r.baseVal.value;
const progressBarLength = 2 * Math.PI * progressBarRadius;
progressBar.style.strokeDasharray = `${progressBarLength} ${progressBarLength}`;
progressBar.style.strokeDashoffset = progressBarLength;
const progressPercentInput = document.querySelector('#progress-container__value-input');

const setProgressPercent = (percent) => {
  progressBar.style.strokeDashoffset = progressBarLength - percent / 100 * progressBarLength;
}
setProgressPercent(+progressPercentInput.value);

progressPercentInput.addEventListener('change', () => {
  setProgressPercent(+progressPercentInput.value);
});