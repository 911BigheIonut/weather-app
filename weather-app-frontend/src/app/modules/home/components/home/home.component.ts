import {Component, OnInit} from '@angular/core';
import { WeatherService } from "../../../../core/services/weather-service/weather.service";
import {TimeService} from "../../../../core/services/time-service/time.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  currentHour!: number;
  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.currentHour = this.timeService.getCurrentHour();
  }
}
