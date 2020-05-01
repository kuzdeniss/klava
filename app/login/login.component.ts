import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isFailed: boolean;

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    };

    this.auth.login(user).subscribe(() => {
      this.isFailed = false;
      this.form.reset();
      this.router.navigate(['']);
    }, (err) => {
      console.log(err);
      this.isFailed = true;
    });
  }

}
