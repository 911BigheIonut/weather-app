import { Component, OnInit } from '@angular/core';
import { GeocodingService } from '../../../../core/services/geocoding-service/geocoding.service';
import * as Constants from '../../../../core/utils/constants';
import { FavoritesService } from 'src/app/core/services/favorites.service';

@Component({
  selector: 'app-city-searchbar',
  templateUrl: './city-searchbar.component.html',
  styleUrl: './city-searchbar.component.scss',
})
export class CitySearchbarComponent implements OnInit {
  query: string = '';
  results: any[] = [];
  selectedCity: any = {
    name: Constants.DEFAULT_CITY,
    country: Constants.DEFAULT_COUNTRY,
    label: Constants.DEFAULT_CITY + ', ' + Constants.DEFAULT_COUNTRY,
    latitude: Constants.DEFAULT_LATITUDE,
    longitude: Constants.DEFAULT_LONGITUDE,
    timezone: Constants.DEFAULT_TIMEZONE,
  };

  constructor(
    private geocodingService: GeocodingService,
    private favoritesService: FavoritesService
  ) {}

  toggleFavorite() {
    const loc = {
      name: this.selectedCity.name,
      country: this.selectedCity.country,
      lat: this.selectedCity.latitude,
      lon: this.selectedCity.longitude,
      timezone: this.selectedCity.timezone,
    };
    this.favoritesService.toggleFavorite(loc);
  }

  isFavorited(): boolean {
    return this.favoritesService.isFavorite(
      this.selectedCity.name,
      this.selectedCity.country
    );
  }

  ngOnInit() {
    this.geocodingService.updateSelectedCoordinates(
      this.selectedCity.latitude,
      this.selectedCity.longitude,
      this.selectedCity.timezone
    );

    this.geocodingService.selectedCity$.subscribe((city) => {
      if (city) {
        this.selectedCity = {
          name: city.name,
          country: city.country,
          label: city.label,
          latitude: city.latitude,
          longitude: city.longitude,
          timezone: city.timezone,
        };
      }
    });
  }

  onSearch(event: any): void {
    const value = event.query;
    if (value.length >= 2) {
      this.geocodingService.searchCity(value).subscribe((res) => {
        this.results = (res.results || []).map((city: any) => ({
          ...city,
          label: `${city.name}, ${city.country}`,
        }));
      });
    }
  }

  selectCity(city: any): void {
    const selected = {
      name: city.value.name,
      country: city.value.country,
      label: city.value.name + ', ' + city.value.country,
      latitude: city.value.latitude,
      longitude: city.value.longitude,
      timezone: city.value.timezone,
    };
    this.selectedCity = selected;
    this.geocodingService.setSelectedCity(selected);
    this.geocodingService.updateSelectedCoordinates(
      selected.latitude,
      selected.longitude,
      selected.timezone
    );
  }
}
