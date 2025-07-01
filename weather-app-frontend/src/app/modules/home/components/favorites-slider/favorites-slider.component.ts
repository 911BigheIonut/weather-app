import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FavoritesService,
  FavoriteLocation,
} from 'src/app/core/services/favorites.service';
import { GeocodingService } from 'src/app/core/services/geocoding-service/geocoding.service';

@Component({
  selector: 'app-favorites-slider',
  templateUrl: './favorites-slider.component.html',
  styleUrls: ['./favorites-slider.component.scss'],
})
export class FavoritesSliderComponent {
  favorites: FavoriteLocation[] = [];
  @ViewChild('slider') slider!: ElementRef;

  constructor(
    private favoritesService: FavoritesService,
    private geocodingService: GeocodingService
  ) {
    this.favoritesService.favorites$.subscribe(
      (favs) => (this.favorites = favs)
    );
  }

  scrollLeft() {
    this.slider.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    this.slider.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }

  selectFavorite(fav: FavoriteLocation) {
    this.geocodingService.selectCityFromFavorite(fav);
  }
}
