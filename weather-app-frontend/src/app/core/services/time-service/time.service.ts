import { Injectable } from '@angular/core';
import {GeocodingService} from "../geocoding-service/geocoding.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  constructor(private geocodingService: GeocodingService) {}

  get currentHour$() {
    return this.geocodingService.coordinates$.pipe(
      map(({ timezone }) => {
        const formatter = new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          hour12: false,
          timeZone: timezone
        });

        const parts = formatter.formatToParts(new Date());
        const hour = parts.find(p => p.type === 'hour')?.value;
        return hour ? parseInt(hour, 10) : new Date().getHours();
      })
    );
  }
}
