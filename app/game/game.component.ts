import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {GameService} from './game.service';
import {interval} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [GameService],
  animations: [
    trigger('gameString', [
      transition('* => *', [
        style({
          transform: 'scale(2)',
          opacity: 0
        }),
        animate('.1s')
      ]),
    ]),
    trigger('startGame', [
      state('collapsed', style({
        height: '0px',
        color: 'green'
      })),
      state('expanded', style({
        height: '*'
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1s')
      ])
    ])
  ]
})
export class GameComponent implements OnInit, AfterViewInit {
  speed = 0;
  isCompleted = false;

  constructor(private gameService: GameService) {
    const speedCounter = interval(100);
    speedCounter.subscribe(() => {
      if (this.gameService.isLastLetter()) { return; }
      this.getSpeed();
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.gameService.initInputString();
    this.gameService.initRangeMeter();
  }

  @HostListener('document:keydown', ['$event.key'])
  press(key) {
    if (this.gameService.isWasteKey(key)) { return; }
    if (this.gameService.isLastLetter()) {
      this.isCompleted = true;
      return;
    }
    this.gameService.changeLetter(key);
  }

  getSpeed() {
    this.speed = this.gameService.getSpeed();
    this.gameService.rangeChange(this.speed);
  }
}
