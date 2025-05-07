import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../../../../core/services/weather-service/weather.service";
import * as Constants from "../../../../core/utils/constants";
import {map} from "rxjs";

@Component({
  selector: 'app-precipitation-probability',
  templateUrl: './precipitation-probability.component.html',
  styleUrl: './precipitation-probability.component.scss'
})
export class PrecipitationProbabilityComponent implements OnInit {
  @Input() currentHour!: number;
  probability?: number;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getPrecipitationProbability(Constants.DEFAULT_LATITUDE, Constants.DEFAULT_LONGITUDE).pipe(
      map(res => res.hourly.precipitation_probability[this.currentHour])
    ).subscribe(prob => this.probability = prob);
  }
}
