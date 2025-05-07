import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { WeatherService } from '../../../../core/services/weather-service/weather.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.scss'],
})
export class HistoricalDataComponent implements AfterViewInit {
  @ViewChild('chart') chartRef!: ElementRef;

  constructor(private weatherService: WeatherService) {}

  ngAfterViewInit(): void {
    const latitude = 44.43;
    const longitude = 26.15;

    this.weatherService.getHistoricalTemperatureData(latitude, longitude).subscribe((response: any) => {
      const timeLabels = response.hourly.time.map((timestamp: string) => new Date(timestamp).toLocaleString());
      const temperatures = response.hourly.temperature_2m;

      this.createChart(timeLabels, temperatures);
    });
  }

  createChart(timeLabels: string[], temperatures: number[]): void {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: timeLabels,
          datasets: [{
            label: 'Temperature',
            data: temperatures,
            borderColor: 'rgba(0, 123, 255, 0.8)',
            fill: false,
          }],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: { display: true, text: 'Date & Time' },
              ticks: { autoSkip: true, maxTicksLimit: 10 },
            },
            y: {
              title: { display: true, text: 'Temperature (°C)' },
              ticks: { },
            },
          },
        },
      });
    }
  }
}
