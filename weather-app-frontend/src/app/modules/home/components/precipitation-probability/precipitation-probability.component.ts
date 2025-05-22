import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../../../../core/services/weather-service/weather.service";
import {map} from "rxjs";
import {GeocodingService} from "../../../../core/services/geocoding-service/geocoding.service";

@Component({
  selector: 'app-precipitation-probability',
  templateUrl: './precipitation-probability.component.html',
  styleUrl: './precipitation-probability.component.scss'
})
export class PrecipitationProbabilityComponent implements OnInit {
  @Input() currentHour!: number;
  probability?: number;

  constructor(private weatherService: WeatherService,
              private geocodingService: GeocodingService) {}

  ngOnInit(): void {
    this.geocodingService.coordinates$.subscribe(({lat, lon}) => {
      this.weatherService.getPrecipitationProbability(lat, lon).pipe(
        map(res => res.hourly.precipitation_probability[this.currentHour])
      ).subscribe(prob => this.probability = prob);
    })
  }
}
