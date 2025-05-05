import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../../../core/services/weather.service";
import * as Constants from "../../../../core/utils/constants";
import {map} from "rxjs";

@Component({
  selector: 'app-precipitation-probability',
  templateUrl: './precipitation-probability.component.html',
  styleUrl: './precipitation-probability.component.scss'
})
export class PrecipitationProbabilityComponent implements OnInit {
  probability?: number;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getPrecipitationProbability(Constants.DEFAULT_LATITUDE, Constants.DEFAULT_LONGITUDE).pipe(
      map(res => res.hourly.precipitation_probability[0])
    ).subscribe(prob => this.probability = prob);
  }
}
