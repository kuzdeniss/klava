import { Component, OnInit } from '@angular/core';
import {HomeService} from './home.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService],
  animations: [
    trigger('homeStart', [
      transition('void => *', [
        style({
          transform: 'scale(2)',
          opacity: 0
        }),
        animate('.5s')
      ]),
    ]),
  ]
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.homeService.typeWords();
  }

}
