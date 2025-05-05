import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../../../core/services/weather.service";
import {map} from "rxjs";
import * as Constants from "../../../../core/utils/constants";

@Component({
  selector: 'app-temperature-card',
  templateUrl: './temperature-card.component.html',
  styleUrl: './temperature-card.component.scss'
})
export class TemperatureCardComponent implements OnInit {
  temperature?: number;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
      this.weatherService.getTemperature(Constants.DEFAULT_LATITUDE, Constants.DEFAULT_LONGITUDE).pipe(
      map(res => res.hourly.temperature_2m[0])
    ).subscribe(temp => this.temperature = temp);
  }
}
