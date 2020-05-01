import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FbAuthResponse, User} from '../interfaces';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email: string;

  constructor(private http: HttpClient) {
    this.email = localStorage.getItem('fb-email');
  }



  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate && (localStorage.getItem('fb-token-exp') !== null)) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  login(user: User) {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      );
  }

  register(user: User) {
    user.returnSecureToken = true;

    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken = (response: FbAuthResponse | null) => {
    if (response) {
      this.email = response.email;
      const expDate = new Date(new Date().getTime() + response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
      localStorage.setItem('fb-email', response.email);
    } else {
      localStorage.clear();
      this.email = null;
    }
  }
}
