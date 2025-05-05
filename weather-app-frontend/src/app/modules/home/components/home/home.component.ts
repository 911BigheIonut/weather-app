import {Component, OnInit} from '@angular/core';
import { WeatherService } from "../../../../core/services/weather.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  temperature: any;
  precipitationProbability: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    //test begin
    const lat = 52.52;
    const lon = 13.42;

    this.weatherService.getTemperature(lat, lon).subscribe({
      next: data => {
        this.temperature = data.hourly.temperature_2m[15];
      },
      error: err => console.error('API error:', err)
    });
    this.weatherService.getPrecipitationProbability(lat, lon).subscribe({
      next: data => {
        this.precipitationProbability = data.hourly.precipitation_probability[0];
      },
      error: err => console.error('API error:', err)
    });
    //test end
  }
}
