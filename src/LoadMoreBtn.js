export default class LoadMoreBtn {
  constructor({ selector, isHidden = false }) {
    this.button = document.querySelector(selector);
    // if (isHidden) this.hide
    isHidden && this.hide;
  }

  enable() {
    this.button.disabled = false;
  }
  disable() {
    this.button.disabled = true;
  }
  show() {
    this.button.classList.remove('hidden');
  }
  hide() {
    this.button.classList.add('hidden');
  }
}