import {Component, OnInit} from '@angular/core';
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
    this.timeService.currentHour$.subscribe(hour => {
      this.currentHour = hour;
    });
  }
}
