import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../../../core/services/weather.service";
import * as Constants from "../../../../core/utils/constants";
import {map} from "rxjs";

@Component({
  selector: 'app-apparent-temperature',
  templateUrl: './apparent-temperature.component.html',
  styleUrl: './apparent-temperature.component.scss'
})
export class ApparentTemperatureComponent implements OnInit {
  apparentTemperature?: number;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getApparentTemperature(Constants.DEFAULT_LATITUDE, Constants.DEFAULT_LONGITUDE).pipe(
      map(res => res?.hourly?.apparent_temperature?.[0])
    ).subscribe(val => this.apparentTemperature = val);
  }
}
