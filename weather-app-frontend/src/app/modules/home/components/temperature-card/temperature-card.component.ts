import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../../../../core/services/weather-service/weather.service";
import {combineLatest, map} from "rxjs";
import {GeocodingService} from "../../../../core/services/geocoding-service/geocoding.service";

@Component({
  selector: 'app-temperature-card',
  templateUrl: './temperature-card.component.html',
  styleUrl: './temperature-card.component.scss'
})
export class TemperatureCardComponent implements OnInit {
  @Input() currentHour!: number;
  temperature?: number;
  temperatureUnit: string = '°C';

  constructor(private weatherService: WeatherService,
    private geocodingService: GeocodingService) {}

  ngOnInit(): void {
    combineLatest([
      this.geocodingService.coordinates$,
      this.weatherService.selectedUnit$
    ]).subscribe(([{ lat, lon }, unit]) => {
      const request$ = unit === 'celsius'
        ? this.weatherService.getTemperatureCelsius(lat, lon)
        : this.weatherService.getTemperatureFarenheit(lat, lon);

      request$.pipe(
        map(res => res?.hourly?.temperature_2m?.[this.currentHour])
      ).subscribe(temp => {
        this.temperature = temp;
        this.temperatureUnit = unit == 'celsius' ? '°C' : '°F';
      });
    });
  }
}
