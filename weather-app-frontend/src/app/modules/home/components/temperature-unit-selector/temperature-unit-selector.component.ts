import { Component } from '@angular/core';
import {WeatherService} from "../../../../core/services/weather-service/weather.service";

@Component({
  selector: 'app-temperature-unit-selector',
  templateUrl: './temperature-unit-selector.component.html',
  styleUrl: './temperature-unit-selector.component.scss'
})
export class TemperatureUnitSelectorComponent {
  selectedUnit: 'celsius' | 'fahrenheit' = 'celsius';

  constructor(private weatherService: WeatherService) {}

  changeUnit() {
    this.weatherService.setUnit(this.selectedUnit);
  }
}
