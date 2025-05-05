import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as Constants from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  public getTemperature(lat: number, lon: number): Observable<any> {
    const url = `${Constants.API_BASE_URL}?${Constants.LATITUDE}=${lat}&${Constants.LONGITUDE}=${lon}&${Constants.HOURLY_TEMPERATURE}`;
    return this.http.get(url);
  }

  public getPrecipitationProbability(lat: number, lon:number): Observable<any> {
    const url = `${Constants.API_BASE_URL}?${Constants.LATITUDE}=${lat}&${Constants.LONGITUDE}=${lon}&${Constants.HOURLY_PRECIPITATION_PROBABILITY}`;
    return this.http.get(url);
  }

  public getPrecipitation(lat: number, lon: number): Observable<any> {
    const url = `${Constants.API_BASE_URL}?${Constants.LATITUDE}=${lat}&${Constants.LONGITUDE}=${lon}&${Constants.HOURLY_PRECIPITATION}`;
    return this.http.get(url);
  }

  public getVisibility(lat: number, lon: number): Observable<any> {
    const url = `${Constants.API_BASE_URL}?${Constants.LATITUDE}=${lat}&${Constants.LONGITUDE}=${lon}&${Constants.HOURLY_VISIBILITY}`;
    return this.http.get(url);
  }

  public getUvIndex(lat: number, lon: number): Observable<any> {
    const url = `${Constants.API_BASE_URL}?${Constants.LATITUDE}=${lat}&${Constants.LONGITUDE}=${lon}&${Constants.HOURLY_UV_INDEX}`;
    return this.http.get(url);
  }

  public getApparentTemperature(lat: number, lon: number): Observable<any> {
    const url = `${Constants.API_BASE_URL}?${Constants.LATITUDE}=${lat}&${Constants.LONGITUDE}=${lon}&${Constants.HOURLY_APPARENT_TEMPERATURE}`;
    return this.http.get(url);
  }
}
