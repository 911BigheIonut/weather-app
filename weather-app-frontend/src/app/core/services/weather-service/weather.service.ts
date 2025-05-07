import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as Constants from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  public getTemperatureCelsius(lat: number, lon: number): Observable<any> {
    const url = `${Constants.API_BASE_URL}?${Constants.LATITUDE}=${lat}&${Constants.LONGITUDE}=${lon}&${Constants.HOURLY_TEMPERATURE}&${Constants.TIMEZONE}`;
    return this.http.get(url);
  }

  public getTemperatureFarenheit(lat: number, lon: number): Observable<any> {
    const url = `${Constants.API_BASE_URL}?${Constants.LATITUDE}=${lat}&${Constants.LONGITUDE}=${lon}&${Constants.HOURLY_TEMPERATURE}&${Constants.TIMEZONE}&${Constants.UNIT_FARENHEIT}`;
    return this.http.get(url);
  }

  public getPrecipitationProbability(lat: number, lon:number): Observable<any> {
    const url = `${Constants.API_BASE_URL}?${Constants.LATITUDE}=${lat}&${Constants.LONGITUDE}=${lon}&${Constants.HOURLY_PRECIPITATION_PROBABILITY}&${Constants.TIMEZONE}`;
    return this.http.get(url);
  }

  public getPrecipitation(lat: number, lon: number): Observable<any> {
    const url = `${Constants.API_BASE_URL}?${Constants.LATITUDE}=${lat}&${Constants.LONGITUDE}=${lon}&${Constants.HOURLY_PRECIPITATION}&${Constants.TIMEZONE}`;
    return this.http.get(url);
  }

  public getVisibility(lat: number, lon: number): Observable<any> {
    const url = `${Constants.API_BASE_URL}?${Constants.LATITUDE}=${lat}&${Constants.LONGITUDE}=${lon}&${Constants.HOURLY_VISIBILITY}&${Constants.TIMEZONE}`;
    return this.http.get(url);
  }

  public getUvIndex(lat: number, lon: number): Observable<any> {
    const url = `${Constants.API_BASE_URL}?${Constants.LATITUDE}=${lat}&${Constants.LONGITUDE}=${lon}&${Constants.HOURLY_UV_INDEX}&${Constants.TIMEZONE}`;
    return this.http.get(url);
  }

  public getApparentTemperatureCelsius(lat: number, lon: number): Observable<any> {
    const url = `${Constants.API_BASE_URL}?${Constants.LATITUDE}=${lat}&${Constants.LONGITUDE}=${lon}&${Constants.HOURLY_APPARENT_TEMPERATURE}&${Constants.TIMEZONE}`;
    return this.http.get(url);
  }

  public getApparentTemperatureFarenheit(lat: number, lon: number): Observable<any> {
    const url = `${Constants.API_BASE_URL}?${Constants.LATITUDE}=${lat}&${Constants.LONGITUDE}=${lon}&${Constants.HOURLY_APPARENT_TEMPERATURE}&${Constants.TIMEZONE}&${Constants.UNIT_FARENHEIT}`;
    return this.http.get(url);
  }

  getHistoricalTemperatureData(lat: number, lon: number): Observable<any> {
    const params = {
      latitude: lat.toString(),
      longitude: lon.toString(),
      hourly: 'temperature_2m',
      timezone: 'auto',
    };

    return this.http.get(Constants.API_BASE_URL, { params });
  }
}
