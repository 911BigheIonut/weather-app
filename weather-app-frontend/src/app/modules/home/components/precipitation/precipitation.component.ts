import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../../../../core/services/weather-service/weather.service";
import {map} from "rxjs";
import {GeocodingService} from "../../../../core/services/geocoding-service/geocoding.service";

@Component({
  selector: 'app-precipitation',
  templateUrl: './precipitation.component.html',
  styleUrl: './precipitation.component.scss'
})
export class PrecipitationComponent implements OnInit {
  @Input() currentHour!: number;
  precipitation?: number;

  constructor(private weatherService: WeatherService,
              private geocodingService: GeocodingService) {}

  ngOnInit(): void {
    this.geocodingService.coordinates$.subscribe(({lat, lon}) => {
      this.weatherService.getPrecipitation(lat, lon).pipe(
        map(res => res?.hourly?.precipitation?.[this.currentHour])
      ).subscribe(value => this.precipitation = value);
    })
  }
}
