import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../../../../core/services/weather-service/weather.service";
import {map} from "rxjs";
import * as Constants from "../../../../core/utils/constants";

@Component({
  selector: 'app-temperature-card',
  templateUrl: './temperature-card.component.html',
  styleUrl: './temperature-card.component.scss'
})
export class TemperatureCardComponent implements OnInit {
  @Input() currentHour!: number;
  temperatureCelsius?: number;
  temperatureFarenheit?: number;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getTemperatureCelsius(Constants.DEFAULT_LATITUDE, Constants.DEFAULT_LONGITUDE).pipe(
      map(res => res.hourly.temperature_2m[this.currentHour])
    ).subscribe(temp => this.temperatureCelsius = temp);

    this.weatherService.getTemperatureFarenheit(Constants.DEFAULT_LATITUDE, Constants.DEFAULT_LONGITUDE).pipe(
      map(res => res.hourly.temperature_2m[this.currentHour])
    ).subscribe(temp => this.temperatureFarenheit = temp);
  }
}
