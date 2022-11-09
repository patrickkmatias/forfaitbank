import { Injectable } from '@angular/core';

@Injectable()
export class UIFeedbackService {

  feedback?:string = undefined;

  seconds: number = 0;

  /**
   * Object with methods to create and dismiss loading animation inside buttons.
   */
  buttonLoading = {
    threeDotsLoading:
    `<div class="loader">
      <span class="loader__element"></span>
      <span class="loader__element"></span>
      <span class="loader__element"></span>
    </div>`,
    create: (button: HTMLElement): HTMLElement => {

      button.setAttribute('disabled','');
      button.style.color = 'transparent';
      button.innerHTML += this.buttonLoading.threeDotsLoading;
      return button;

    },
    dismiss: (button: HTMLElement): HTMLElement => {

      button.removeAttribute('disabled');
      button.style.color = 'initial';
      document.querySelector('.loader')!.remove();
      return button;

    }
  };

  constructor() { }

  /**
   * Execute callback after given seconds
   *
   * @param {number} seconds
   * @param {Function} callback function
   *
   * @return void
   */
    timer(seconds: number, callback: Function): void {

    this.seconds = seconds

    let timer = setInterval(() => {
      seconds -= 1;
      seconds === 0 ? clearInterval(timer) : this.seconds = seconds;
    }, 1000)

    setTimeout(() => {
      callback();
    }, seconds * 1000);

  }

}
