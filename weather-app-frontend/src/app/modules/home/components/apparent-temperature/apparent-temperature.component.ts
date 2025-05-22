import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../../../../core/services/weather-service/weather.service";
import {combineLatest, map} from "rxjs";
import {GeocodingService} from "../../../../core/services/geocoding-service/geocoding.service";

@Component({
  selector: 'app-apparent-temperature',
  templateUrl: './apparent-temperature.component.html',
  styleUrl: './apparent-temperature.component.scss'
})
export class ApparentTemperatureComponent implements OnInit {
  @Input() currentHour!: number;
  apparentTemperature?: number;
  temperatureUnit: string = '°C';

  constructor(private weatherService: WeatherService,
              private geocodingService: GeocodingService) {}

  ngOnInit(): void {
    combineLatest([
      this.geocodingService.coordinates$,
      this.weatherService.selectedUnit$
    ]).subscribe(([{ lat, lon }, unit]) => {
      const request$ = unit === 'celsius'
        ? this.weatherService.getApparentTemperatureCelsius(lat, lon)
        : this.weatherService.getApparentTemperatureFarenheit(lat, lon);

      request$.pipe(
        map(res => res?.hourly?.apparent_temperature?.[this.currentHour])
      ).subscribe(temp => {
        this.apparentTemperature = temp;
        this.temperatureUnit = unit == 'celsius' ? '°C' : '°F';
      });
    });
  }
}
