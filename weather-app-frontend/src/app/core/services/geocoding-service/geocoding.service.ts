import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import * as Constants from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private selectedCoordinates = new BehaviorSubject<{ lat: number, lon: number, timezone: string }>({
    lat: Constants.DEFAULT_LATITUDE,
    lon: Constants.DEFAULT_LONGITUDE,
    timezone: Constants.DEFAULT_TIMEZONE
  });

  coordinates$ = this.selectedCoordinates.asObservable();

  constructor(private http: HttpClient) {}

  searchCity(name: string) {
    const url = `${Constants.GEOCODING_API_BASE_URL}${encodeURIComponent(name)}&count=5`;
    return this.http.get<any>(url);
  }

  updateSelectedCoordinates(lat: number, lon: number, timezone: string) {
    this.selectedCoordinates.next({ lat, lon, timezone });
  }
}
