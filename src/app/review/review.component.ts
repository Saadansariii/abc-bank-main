import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  singleData: any = {};
  allData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.getSelectedData();
  }

  getSelectedData(): void {
    this.http.get<any>('http://167.172.220.75:8084/CashflowForecastingApplication/api/review-list')
      .subscribe({
        next: (result) => {
          if (result && result.data && result.data.content) {
            this.singleData = result.data.content[0]; // Adjust according to the actual response structure
          } else {
            console.error('Unexpected API response structure', result);
          }
        },
        error: (error) => {
          console.error('Error fetching data', error);
        }
      });
  }
  
}
