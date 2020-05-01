import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {Router} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('imgStart', [
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('.5s')
      ]),
      transition('* => void', [
        style({
          opacity: 1
        }),
        animate('.5s', style({ opacity: 0}))
      ])
    ]),
  ],
})
export class AppComponent implements OnInit{
  title = 'klava';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
  }


  getCurrentUrl() {
    return this.router.url;
  }

  get email() {
    return this.auth.email;
  }

  logout() {
    this.auth.logout();
  }

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }
}
