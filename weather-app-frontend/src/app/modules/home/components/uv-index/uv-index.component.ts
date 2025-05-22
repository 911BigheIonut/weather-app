import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../../../../core/services/weather-service/weather.service";
import {map} from "rxjs";
import {GeocodingService} from "../../../../core/services/geocoding-service/geocoding.service";

@Component({
  selector: 'app-uv-index',
  templateUrl: './uv-index.component.html',
  styleUrl: './uv-index.component.scss'
})
export class UvIndexComponent implements OnInit {
  @Input() currentHour!: number;
  uvIndex?: number;

  constructor(private weatherService: WeatherService,
              private geocodingService: GeocodingService) {}

  ngOnInit(): void {
    this.geocodingService.coordinates$.subscribe(({lat, lon}) => {
      this.weatherService.getUvIndex(lat, lon).pipe(
        map(res => res?.hourly?.uv_index?.[this.currentHour])
      ).subscribe(val => this.uvIndex = val);
    })
  }
}
