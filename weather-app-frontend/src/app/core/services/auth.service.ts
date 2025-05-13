import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: string | null = null;

  get user(): string | null {
    return this._user;
  }

  isLoggedIn(): boolean {
    return this._user !== null;
  }

  login(username: string) {
    this._user = username;
  }

  logout() {
    this._user = null;
  }
}
