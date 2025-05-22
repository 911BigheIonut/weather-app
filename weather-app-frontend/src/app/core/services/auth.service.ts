import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
  user: {
    username: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: string | null = null;

  constructor(private http: HttpClient) {}

  get user(): string | null {
    return this._user;
  }

  isLoggedIn(): boolean {
    return this._user !== null;
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login', { username, password }).pipe(
      tap(res => {
        this._user = res.user.username;
        localStorage.setItem('token', res.token); // optionally store the token
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post('/api/auth/register', { username, email, password });
  }

  logout() {
    this._user = null;
    localStorage.removeItem('token');
  }
}
