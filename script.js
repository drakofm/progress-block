const firstProgress = createProgressInstance();
document.body.insertAdjacentElement('afterbegin', firstProgress.rootElement);
firstProgress.setEventListeners();