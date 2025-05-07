import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../../../../core/services/weather-service/weather.service";
import * as Constants from "../../../../core/utils/constants";
import {map} from "rxjs";

@Component({
  selector: 'app-uv-index',
  templateUrl: './uv-index.component.html',
  styleUrl: './uv-index.component.scss'
})
export class UvIndexComponent implements OnInit {
  @Input() currentHour!: number;
  uvIndex?: number;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getUvIndex(Constants.DEFAULT_LATITUDE, Constants.DEFAULT_LONGITUDE).pipe(
      map(res => res?.hourly?.uv_index?.[this.currentHour])
    ).subscribe(val => this.uvIndex = val);
  }
}
