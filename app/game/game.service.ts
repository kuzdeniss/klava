import {EventEmitter, Injectable, Output, Renderer2} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TextsService} from '../shared/services/texts.service';



@Injectable()
export class GameService {
  private wasteKeys = {
    Shift: true,
    Alt: true,
    CapsLock: true,
    Escape: true,
    Backspace: true,
    Delete: true,
    Pause: true
  };
  private lastLetterNumber = 0;
  private length;
  private gameInputString;
  private firstDate;
  private inputStringLeft;
  private readonly texts: string[];
  private rangeClock;
  private rangeMeter;
  private rangeShow;

  @Output()
  changeSpeed = new EventEmitter();

  constructor(private renderer: Renderer2, private activateRoute: ActivatedRoute, private textsService: TextsService) {
    this.texts = textsService.texts;
  }

  initRangeMeter() {
    this.rangeMeter = document.querySelector('#range');
    this.rangeClock =  document.querySelector('.meter-clock');
  }

  rangeChange = (speed) => {
    const maxSpeed = 800;
    speed = speed / (maxSpeed / 100);
    const rotateClock = speed;
    this.rangeClock.style.transform = 'rotate(' + (-90 + ((rotateClock * 180) / 100)) + 'deg)';
  };

  isWasteKey(key) {
    if (this.wasteKeys[key]) { return true; }
  }

  getLength() {
    return this.length;
  }

  getLastNumb() {
    return this.lastLetterNumber;
  }

  implementLastNumb() {
    if (this.lastLetterNumber > this.length) { return false; }
    this.lastLetterNumber++;
  }

  getSpans() {
    const gameInputString = this.gameInputString;
    return gameInputString.querySelectorAll('span');
  }

  getCurrentSpan() {
    const spans = this.getSpans();
    return spans[this.getLastNumb()];
  }

  getGameInputString() {
    if (this.gameInputString) { return this.gameInputString; }
    return this.gameInputString = document.getElementById('game-input__string') as HTMLElement;
  }

  initInputString() {
    const gameInput = document.querySelector('.game-input') as HTMLElement;
    const gameInputString = this.getGameInputString();
    this.inputStringLeft = gameInput.offsetWidth / 2;
    gameInputString.style.left = this.inputStringLeft + 'px';

    const str = this.getText();
    const spans = Array.prototype.map.call(str, l => {
      const span = this.renderer.createElement('span');
      const text = this.renderer.createText(l);
      this.renderer.appendChild(span, text);
      return span;
    });
    this.length = spans.length;
    gameInputString.innerHTML = '';
    spans.map((span) => {
      this.renderer.appendChild(gameInputString, span);
    });
  }

  moveInputString(spanWidth) {
    this.inputStringLeft = this.inputStringLeft - spanWidth;
    this.gameInputString.style.left = this.inputStringLeft + 'px';
  }

  getDateForSpeed() {
    if (!this.firstDate) { return; }
    return  (new Date().getTime() - this.firstDate.getTime()) / 1000;
  }

  getSpeed() {
    if (!this.firstDate) { return 0; }
    return Math.round(60 / this.getDateForSpeed() * this.lastLetterNumber);
  }

  changeLetter(key) {
    const span = this.getCurrentSpan();
    if (span.innerHTML !== key) { return; }
    if (!this.firstDate) { this.firstDate = new Date(); }
    this.changeSpeed.emit(this.getDateForSpeed());
    this.renderer.addClass(span, 'game-input__string-pressed');
    this.renderer.removeClass(span, 'game-input__string-current');
    if (span.nextSibling) { this.renderer.addClass(span.nextSibling, 'game-input__string-current'); }
    this.implementLastNumb();
    this.moveInputString(span.getBoundingClientRect().width);
  }

  getText() {
    const numb = Math.floor(Math.random() * 13);
    return this.texts[numb];
  }

  isLastLetter() {
    return this.getLength() <= this.getLastNumb();
  }
}
