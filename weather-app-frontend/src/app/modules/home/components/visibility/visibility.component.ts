import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../../../core/services/weather.service";
import * as Constants from "../../../../core/utils/constants";
import {map} from "rxjs";

@Component({
  selector: 'app-visibility',
  templateUrl: './visibility.component.html',
  styleUrl: './visibility.component.scss'
})
export class VisibilityComponent implements OnInit {
  visibility?: number;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getVisibility(Constants.DEFAULT_LATITUDE, Constants.DEFAULT_LONGITUDE).pipe(
      map(res => res?.hourly?.visibility?.[0] / 1000)
    ).subscribe(v => this.visibility = v);
  }
}
