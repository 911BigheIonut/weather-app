import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  public getCurrentHour() {
    const currentDate = new Date();
    return currentDate.getHours();
  }
}
