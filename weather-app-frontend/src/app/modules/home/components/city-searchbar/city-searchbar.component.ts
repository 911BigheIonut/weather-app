import {Component, OnInit} from '@angular/core';
import {GeocodingService} from "../../../../core/services/geocoding-service/geocoding.service";
import * as Constants from "../../../../core/utils/constants";

@Component({
  selector: 'app-city-searchbar',
  templateUrl: './city-searchbar.component.html',
  styleUrl: './city-searchbar.component.scss'
})
export class CitySearchbarComponent implements OnInit {
  query: string = '';
  results: any[] = [];
  selectedCity: any = {
    name: Constants.DEFAULT_CITY,
    country: Constants.DEFAULT_COUNTRY,
    label: Constants.DEFAULT_CITY + ', ' + Constants.DEFAULT_COUNTRY,
  };

  constructor(private geocodingService: GeocodingService) {}

  ngOnInit() {
    this.geocodingService.updateSelectedCoordinates(
      Constants.DEFAULT_LATITUDE,
      Constants.DEFAULT_LONGITUDE,
      Constants.DEFAULT_TIMEZONE
    );
  }

  onSearch(event: any): void {
    const value = event.query;
    if (value.length >= 2) {
      this.geocodingService.searchCity(value).subscribe(res => {
        this.results = (res.results || []).map((city: any) => ({
          ...city,
          label: `${city.name}, ${city.country}`
        }));
      });
    }
  }

  selectCity(city: any): void {
    this.selectedCity = {
      name: city.value.name,
      country: city.value.country,
      label: city.value.name + ', ' + city.value.country
    };
    this.geocodingService.updateSelectedCoordinates(city.value.latitude, city.value.longitude, city.value.timezone);
  }
}
