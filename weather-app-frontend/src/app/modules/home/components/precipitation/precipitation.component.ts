import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../../../../core/services/weather-service/weather.service";
import * as Constants from "../../../../core/utils/constants";
import {map} from "rxjs";

@Component({
  selector: 'app-precipitation',
  templateUrl: './precipitation.component.html',
  styleUrl: './precipitation.component.scss'
})
export class PrecipitationComponent implements OnInit {
  @Input() currentHour!: number;
  precipitation?: number;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getPrecipitation(Constants.DEFAULT_LATITUDE, Constants.DEFAULT_LONGITUDE).pipe(
      map(res => res?.hourly?.precipitation?.[this.currentHour])
    ).subscribe(value => this.precipitation = value);
  }
}
