import {
  HttpClient,
  HttpErrorResponse,
  HttpRequest,
} from '@angular/common/http';
import { HostListener, Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { AuthResponse, RefreshTokenContent, User } from '../interfaces';
import { Router } from '@angular/router';
import {MainService} from './main.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public error$: Subject<string> = new Subject<string>();
  // public userRole$: Subject<string> = new Subject<string>();
  private timer: any;
  public time: number = 1000 * 1000;
  private helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router, private mainService: MainService) {}

  get currentUser(): any {
    // debugger;
    if (this.isAuthenticated()) {
      const decodedToken = this.helper.decodeToken(
        JSON.parse(localStorage.getItem('tokenData') + '').access_token
      );

      // console.log('decodedToken', decodedToken);

      // return decodedToken.user.roles;
      return decodedToken.user;
    }
  }

  get token(): string | null {
    return localStorage.getItem('tokenData');
  }

  login(user: User): Observable<any> {
    return this.http
      .post(`${environment.baseURL}/user/login`, user)
      .pipe(
        tap(this.setToken.bind(this)),
        catchError(this.handleError.bind(this))
      );
  }

  private handleError(error: HttpErrorResponse): any {
    // console.log('error', error);
    const { message } = error.error;
    switch (message) {
      case 'INVALID_LOGIN':
        this.error$.next('Неверный логин');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль');
        break;
      case 'Tokens not found':
        this.error$.next('Токен не найден');
        break;
    }
    return throwError(error);
  }

  isAuthenticated(): any {
    return !!this.token;
  }

  logout(logoutMes: string = ''): void {
    this.setToken(null);
    this.stopTimerLogout();
    if (logoutMes) {
      this.router.navigate(['/login'], {
        queryParams: {
          [logoutMes]: true,
        },
      });
    }
  }

  setUserExp(time: number): void {
    this.time = time;
  }

  private setToken(response: any): void {
    if (response) {
      // const helper = new JwtHelperService();
      const decodedToken = this.helper.decodeToken(response.access_token);
      this.time = decodedToken.user.user_exp;
      // this.userRole$.next(decodedToken.user.username);

      // console.log('decodedToken', decodedToken);


      localStorage.setItem('tokenData', JSON.stringify(response));
      localStorage.setItem('tokenExp', JSON.stringify(decodedToken.exp * 1000));
      this.startTimerLogout();
    } else {
      localStorage.clear();
    }
  }

  refreshToken(tokenData: any): Observable<any> {
    // debugger;
    return this.http
      .post(`${environment.baseURL}/user/refreshToken`, JSON.parse(tokenData))
      .pipe(
        shareReplay(),
        tap(this.setToken)
        // catchError(this.handleError.bind(this))
      );
  }

  // fetchWithAuth(): Observable<any> | void {
  //   let tokenData = localStorage.getItem('tokenData');

  //   if (tokenData) {
  //     const expDate = new Date(Number(localStorage.getItem('tokenExp')));
  //     console.log('expDate', expDate);
  //     if (new Date() > expDate) {
  //       debugger;
  //       this.refreshToken(tokenData).subscribe();
  //     }
  //   } else {
  //     this.logout('authFailed');
  //     return throwError({ error: { status: 403, message: 'INVALID_TOKEN' } });
  //   }
  // }

  fetchWithAuth(req: Observable<any>): Observable<any> {
    // debugger;
    const tokenData = localStorage.getItem('tokenData');

    if (tokenData) {
      const expDate = new Date(Number(localStorage.getItem('tokenExp')));
      // console.log('expDate', expDate);
      if (new Date() > expDate) {
        // debugger;
        this.refreshToken(tokenData).subscribe();
      }
      return req;
    } else {
      this.logout('authFailed');
      return throwError({ error: { status: 403, message: 'INVALID_TOKEN' } });
    }
  }

  startTimerLogout(): void {
    // console.log('time', this.time);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.logout('authFailed'), this.time);
  }

  private stopTimerLogout(): void {
    clearTimeout(this.timer);
  }
}
