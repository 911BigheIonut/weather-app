import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { WeatherService } from '../../../../core/services/weather-service/weather.service';
import { Chart, registerables } from 'chart.js';
import {GeocodingService} from "../../../../core/services/geocoding-service/geocoding.service";
import {combineLatest} from "rxjs";

Chart.register(...registerables);

@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.scss'],
})
export class HistoricalDataComponent implements AfterViewInit {
  @ViewChild('chart') chartRef!: ElementRef;
  private chartInstance: Chart | null = null;

  constructor(
    private weatherService: WeatherService,
    private geocodingService: GeocodingService
  ) {}

  ngAfterViewInit(): void {
    combineLatest([
      this.geocodingService.coordinates$,
      this.weatherService.selectedUnit$
    ]).subscribe(([{ lat, lon }, unit]) => {
      const request$ = unit === 'celsius'
        ? this.weatherService.getTemperatureCelsius(lat, lon)
        : this.weatherService.getTemperatureFarenheit(lat, lon);

      request$.subscribe((response: any) => {
        const timeLabels = response.hourly.time.map((timestamp: string) => {
          const date = new Date(timestamp);
          return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:00`;
        });
        const temperatures = response.hourly.temperature_2m;

        this.createChart(timeLabels, temperatures, unit);
      });
    });
  }

  createChart(timeLabels: string[], temperatures: number[], unit: 'celsius' | 'fahrenheit'): void {
    const ctx = this.chartRef.nativeElement.getContext('2d');

    if (ctx) {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: timeLabels,
          datasets: [
            {
              label: 'Temperature',
              data: temperatures,
              borderColor: 'rgba(0, 123, 255, 0.8)',
              fill: false,
              tension: 0.3,
            }
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              ticks: {
                autoSkip: true,
                maxRotation: 45,
                minRotation: 30,
                maxTicksLimit: 10,
              },
            },
            y: {
              title: {
                display: true,
                text: `Temperature (${unit === 'celsius' ? '°C' : '°F'})`,
              },
            },
          },
        },
      });
    }
  }
}
