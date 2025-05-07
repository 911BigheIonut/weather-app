import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../../../../core/services/weather-service/weather.service";
import * as Constants from "../../../../core/utils/constants";
import {map} from "rxjs";

@Component({
  selector: 'app-apparent-temperature',
  templateUrl: './apparent-temperature.component.html',
  styleUrl: './apparent-temperature.component.scss'
})
export class ApparentTemperatureComponent implements OnInit {
  @Input() currentHour!: number;
  apparentTemperatureCelsius?: number;
  apparentTemperatureFarenheit?: number;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getApparentTemperatureCelsius(Constants.DEFAULT_LATITUDE, Constants.DEFAULT_LONGITUDE).pipe(
      map(res => res?.hourly?.apparent_temperature?.[this.currentHour])
    ).subscribe(val => this.apparentTemperatureCelsius = val);
    this.weatherService.getApparentTemperatureFarenheit(Constants.DEFAULT_LATITUDE, Constants.DEFAULT_LONGITUDE).pipe(
      map(res => res?.hourly?.apparent_temperature?.[this.currentHour])
    ).subscribe(val => this.apparentTemperatureFarenheit = val);
  }
}
