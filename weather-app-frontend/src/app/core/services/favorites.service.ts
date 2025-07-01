import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

export interface FavoriteLocation {
  name: string;
  country: string;
  lat: number;
  lon: number;
  timezone: string;
}

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private favorites = new BehaviorSubject<FavoriteLocation[]>([]);
  favorites$ = this.favorites.asObservable();

  constructor(private http: HttpClient, private auth: AuthService) {
    this.loadFavorites();
  }

loadFavorites(username?: string) {
  const user = username || this.auth.user;
  if (!user) return;

  this.http.get<{ favorites: FavoriteLocation[] }>(`/api/favorites/${user}`)
    .subscribe(res => this.favorites.next(res.favorites));
}


  isFavorite(name: string, country: string): boolean {
    return this.favorites.value.some(f => f.name === name && f.country === country);
  }

  toggleFavorite(location: FavoriteLocation) {
    if (!this.auth.user) return;
    const username = this.auth.user;

    if (this.isFavorite(location.name, location.country)) {
      this.http.post(`/api/favorites/remove`, { username, name: location.name })
        .subscribe((res: any) => this.favorites.next(res.favorites));
    } else {
      this.http.post(`/api/favorites/add`, { username, favorite: location })
        .subscribe((res: any) => this.favorites.next(res.favorites));
    }
  }
}
