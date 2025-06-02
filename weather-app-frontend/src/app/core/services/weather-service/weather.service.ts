import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import * as Constants from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private unit$ = new BehaviorSubject<'celsius' | 'fahrenheit'>(this.getInitialUnit());
  constructor(private http: HttpClient) {}

  private getInitialUnit(): 'celsius' | 'fahrenheit' {
    const stored = localStorage.getItem('tempUnit');
    return stored === 'fahrenheit' ? 'fahrenheit' : 'celsius';
  }

  get selectedUnit$() {
    return this.unit$.asObservable();
  }

  setUnit(unit: 'celsius' | 'fahrenheit') {
    this.unit$.next(unit);
    localStorage.setItem('tempUnit', unit);
  }

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
}
