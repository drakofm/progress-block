class ProgressBar {

  constructor(
    size = 160, 
    strokeWidth = 11, 
    strokeColorSubstrate = '#eff3f6', 
    strokeColorBar = '#005bff',
    transitionSpeed = 0.1,
  ) {
    this.creationTime = Date.now();
    this.rootElement = document.createElement('div');
    this.rootElement.insertAdjacentHTML('afterbegin', 
      `
        <svg
        id="progress-container__bar-${this.creationTime}"
        width="${size}"
        height="${size}"
      >
        <circle 
          id="progress-container__basis-circle-${this.creationTime}"
          stroke="${strokeColorSubstrate}" 
          stroke-width="${strokeWidth}"
          cx="${size / 2}" 
          cy="${size / 2}"
          r="${size / 2 - strokeWidth * 2}"
          fill="transparent"
        />
        <circle 
          id="progress-container__progress-circle-${this.creationTime}"
          stroke="${strokeColorBar}" 
          stroke-width="${strokeWidth}"
          cx="${size / 2}" 
          cy="${size / 2}"
          r="${size / 2 - strokeWidth * 2}"  
          fill="transparent"
        />
      </svg>
      `
    );
    this.basisCircle = this.rootElement.firstElementChild.children[0];
    this.progressCircle = this.rootElement.firstElementChild.children[1];
    this.progressCircle.style.transformOrigin = 'center';
    this.progressCircle.style.transform = 'rotate(-90deg)';
    this.progressCircle.style.transition = `stroke-dashoffset ${transitionSpeed}s`;
    this.progressCircleRadius = this.progressCircle.r.baseVal.value;
    this.progressCircleCircumference = 2 * Math.PI * this.progressCircleRadius;
    this.progressCircle.style.strokeDasharray = `${this.progressCircleCircumference} ${this.progressCircleCircumference}`;
    this.progressCircle.style.strokeDashoffset = this.progressCircleCircumference;
  }

  insertAfter(node) {
    node.after(this.rootElement);
  }

  setProgressPercent(percent) {
    percent > 100 ? percent = 100 : percent < 0 ? percent = 0: '';
    this.progressCircle.style.strokeDashoffset = this.progressCircleCircumference - percent / 100 * this.progressCircleCircumference;
  }

  switchLoadingAnimation(isChecked) {
    if (isChecked) {
      this.progressCircle.classList.add('progress-container__progress-circle-animated-loading');
    } else {
      this.progressCircle.classList.remove('progress-container__progress-circle-animated-loading');
    }
  }
  
  switchHiding(isChecked) {
    if (isChecked) {
      this.rootElement.style.opacity = 0;
    } else {
      this.rootElement.style.opacity = 1;
    }
  }

  // TODO: анимации нужно перенести из CSS в JS

}

const firstProgressBar = new ProgressBar();
firstProgressBar.insertAfter(document.querySelector('#progress-container__headline'));

const progressPercentInput = document.querySelector('#progress-container__value-input');
const togglerAnimation = document.querySelector('#progress-container__animate-toggle');
const togglerHide = document.querySelector('#progress-container__hide-toggle');



progressPercentInput.addEventListener('change', () => {
  firstProgressBar.setProgressPercent(+progressPercentInput.value);
});

togglerAnimation.addEventListener('change', (event) => {
  firstProgressBar.switchLoadingAnimation(event.target.checked);
});

togglerHide.addEventListener('change', (event) => {
  firstProgressBar.switchHiding(event.target.checked);
});
