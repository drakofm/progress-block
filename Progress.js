class Progress {

  constructor(
    name = 'Progress',
    size = 160, 
    strokeWidth = 11, 
    strokeColorSubstrate = '#eff3f6', 
    strokeColorBar = '#005bff',
    transitionSpeedSeconds = 0.1,
    animationPeriodSeconds = 1,
  ) {
    this.id = Math.floor(Math.random() * 1e9);
    this.rootElement = document.createElement('div');
    this.rootElement.id = `progress-container-${this.id}`;
    this.rootElement.className = `progress-container`;
    this.rootElement.insertAdjacentHTML('afterbegin', 
      `
        <p 
          id="progress-container__headline-${this.id}" 
          class="progress-container__headline"
        >
         ${name}
        </p>

        <svg
          id="progress-container__bar-${this.id}"
          class="progress-container__bar"
          width="${size}"
          height="${size}"
        >
          <circle 
            id="progress-container__basis-circle-${this.id}"
            class="progress-container__basis-circle"
            stroke="${strokeColorSubstrate}" 
            stroke-width="${strokeWidth}"
            cx="${size / 2}" 
            cy="${size / 2}"
            r="${size / 2 - strokeWidth * 2}"
            fill="transparent"
          />
          <circle 
            id="progress-container__progress-circle-${this.id}"
            class="progress-container__progress-circle"
            stroke="${strokeColorBar}" 
            stroke-width="${strokeWidth}"
            cx="${size / 2}" 
            cy="${size / 2}"
            r="${size / 2 - strokeWidth * 2}"  
            fill="transparent"
          />
        </svg>

        <section id="progress-container__controls-${this.id}" class="progress-container__controls">

          <div class="progress-container__control-container">
            <input 
              id="progress-container__value-input-${this.id}"
              class="progress-container__value-input" 
              type="text" 
              value="0"
            > 
            <label for="progress-container__value-input-${this.id}">Value</label>
          </div>


          <div class="progress-container__control-container">

            <label for="progress-container__animate-toggle-${this.id}" class="progress-container__label">
              <input 
              id="progress-container__animate-toggle-${this.id}" 
              class="progress-container__input" 
              type="checkbox"
              >
              <span class="progress-container__slider"></span>
            </label>

            <label for="progress-container__animate-toggle-${this.id}">Animate</label>
          </div>


          <div class="progress-container__control-container">

            <label for="progress-container__hide-toggle-${this.id}" class="progress-container__label">
              <input id="progress-container__hide-toggle-${this.id}" class="progress-container__input" type="checkbox">
              <span class="progress-container__slider"></span>
            </label> 

            <label for="progress-container__hide-toggle-${this.id}" class="progress-container__input">Hide</label>

          </div>

        </section>
      `
    );
    this.barCircles = this.rootElement.children[1];
    this.basisCircle = this.barCircles.children[0];
    this.progressCircle = this.barCircles.children[1];
    this.progressPercentInput = this.rootElement.children[2].children[0].children[0];
    this.togglerAnimation = this.rootElement.children[2].children[1].children[0];
    this.togglerHide = this.rootElement.children[2].children[2].children[0];

    this.barCircles.style.transition = `${transitionSpeedSeconds}s`;
    this.progressCircle.style.transformOrigin = 'center';
    this.progressCircle.style.transform = 'rotate(-90deg)';
    this.progressCircle.style.transition = `stroke-dashoffset ${transitionSpeedSeconds}s`;
    this.progressCircleRadius = this.progressCircle.r.baseVal.value;
    this.progressCircleCircumference = 2 * Math.PI * this.progressCircleRadius;
    this.progressCircle.style.strokeDasharray = `${this.progressCircleCircumference} ${this.progressCircleCircumference}`;
    this.progressCircle.style.strokeDashoffset = this.progressCircleCircumference;
    this.progressCircleKeyframeEffect = new KeyframeEffect(
      this.progressCircle,
      [
        {
          strokeDashoffset: 0,
          transform: 'rotate(-90deg)',
        },

        {
          strokeDashoffset: '90%',
        },

        {
          strokeDashoffset: 0,
          transform: 'rotate(270deg)',
        },
      ],
      {
        duration: animationPeriodSeconds * 1000,
        iterations: Infinity,
        easing: "ease-in-out",
      }
    );
    this.progressCircleAnimation = new Animation(this.progressCircleKeyframeEffect);
  }

  setProgressPercent(percent) {
    percent > 100 ? percent = 100 : percent < 0 ? percent = 0: '';
    this.progressCircle.style.strokeDashoffset = this.progressCircleCircumference - percent / 100 * this.progressCircleCircumference;
  }

  switchLoadingAnimation(isChecked) {
    if (isChecked) {
      this.progressCircleAnimation.play();
    } else {
      this.progressCircleAnimation.cancel();
    }
  }
  
  switchHiding(isChecked) {
    if (isChecked) {
      this.barCircles.style.opacity = 0;
    } else {
      this.barCircles.style.opacity = 1;
    }
  }

  setEventListeners() {
    this.progressPercentInput.addEventListener('change', () => {
      this.setProgressPercent(+this.progressPercentInput.value);
    });
  
    this.togglerAnimation.addEventListener('change', (event) => {
      this.switchLoadingAnimation(event.target.checked);
    });
  
    this.togglerHide.addEventListener('change', (event) => {
      this.switchHiding(event.target.checked);
    });
  }
}

window.createProgressInstance = () => {
  return new Progress();
}