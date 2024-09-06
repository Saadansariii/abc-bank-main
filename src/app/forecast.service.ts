import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private apiUrl = 'http://192.168.63.1:8080/api/forecasts';

  constructor(private http: HttpClient) {}

  submitForecast(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
