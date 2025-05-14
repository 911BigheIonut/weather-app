import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../../../../core/services/weather-service/weather.service";
import {map} from "rxjs";
import {GeocodingService} from "../../../../core/services/geocoding-service/geocoding.service";

@Component({
  selector: 'app-visibility',
  templateUrl: './visibility.component.html',
  styleUrl: './visibility.component.scss'
})
export class VisibilityComponent implements OnInit {
  @Input() currentHour!: number;
  visibility?: number;

  constructor(private weatherService: WeatherService,
              private geocodingService: GeocodingService) {}

  ngOnInit(): void {
    this.geocodingService.coordinates$.subscribe(({lat, lon}) => {
      this.weatherService.getVisibility(lat, lon).pipe(
        map(res => res?.hourly?.visibility?.[this.currentHour] / 1000)
      ).subscribe(v => this.visibility = v);
    })
  }
}
