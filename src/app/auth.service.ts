import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from './models/login-response.model';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.serverUrl;

  constructor(
    private http: HttpClient
  ) { }


  login(user: User): Observable<LoginResponse> {
    console.log(this.apiUrl);
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`, {
        userName: user.username,
        password: user.password
      }).pipe(
      map((response) => {
        return response as LoginResponse;
    }),
    catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError({
      status: 'error',
      message: 'could not log in'
    });
  }

  isAuthenticated(): boolean {
    const userId = sessionStorage.getItem('userId');
    if (userId) { //TODO get token and compare with server value
      return true
    }
    return false;
  }

}
