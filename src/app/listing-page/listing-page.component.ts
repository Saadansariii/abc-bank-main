import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { rejectSearch } from 'src/app/utils/api'
import { response } from 'express';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css'],
})
export class ListingPageComponent {
  showAdditionalColumns: boolean   = false;
  tickBox : boolean = false
  // searchValue: string = '';
  results: any[] = [];
  data: any[] = [];
  selectedOption: number = 0;
  searchValue: string = '';
  currentStatus: 'rejected' | 'pending' | 'review' | null = null;

  // new rejectsearch

  onOptionChange() {
    console.log('Selected option:', this.selectedOption);
  }

  setStatus(status: 'rejected' | 'pending' | 'review') {
    this.currentStatus = status;
    console.log(`Status set to: ${status}`);
  }
  search() {
    if (!this.currentStatus) {
      alert('Please select Any One Of This Reject, Pending, or Review first')
      console.log('Please select Reject, Pending, or Review first');
      return;
    }
  
    if (!this.searchValue) {
      console.log('Please enter a search value');
      return;
    }

    let searchParam: string;
    switch (this.selectedOption) {
      case 0: searchParam = 'referenceNo'; break;
      case 1: searchParam = 'corporateCode'; break;
      case 2: searchParam = 'corporateName'; break;
      case 3: searchParam = 'forecastingAs'; break;
      case 4: searchParam = 'entryType'; break;
      default: searchParam = 'corporateCode';
    }

    let apiUrl: string;
    const baseUrl = 'http://167.172.220.75:8084/CashflowForecastingApplication/api';
    
    switch (this.currentStatus) {
      case 'rejected':
        apiUrl = `${baseUrl}/rejected/search`;
        break;
      case 'pending':
        apiUrl = `${baseUrl}/pending-list/search`;
        break;
      case 'review':
        apiUrl = `${baseUrl}/review-list/search`;
        break;
      default:
        console.log('Invalid status');
        return;
    }

    const params = { [searchParam]: this.searchValue };

  this.http.get(apiUrl, { params: params }).subscribe(
    (response: any) => {
      console.log('Search results:', response);
      if (response.code === 200 && response.data && response.data.content) {
        this.results = response.data.content;
      } else {
        alert("Data Not Found")
        console.error('No data found or error in response:', response.message);
        this.results = [];
      }
    },
    (error) => {
      alert("You Select Wrong Input ")
      console.error('Error occurred during search:', error);
      this.results = [];
    }
  );
}
  
  // button
  rejectBtn(): void {
    this.rejectBtnApi();
    this.toggleColumn();
    this.setStatus('rejected');
    this.search
  }

  reviewBtn(){
    this.reviewBtnApi();
    this.setStatus('review')
    this.search
  }

  pendingBtn(){
    this.pendingBtnApi();
    this.pendingToggle();
    this.setStatus('pending');
    this.search
  }


  toggleColumn() {
    this.showAdditionalColumns = true;
    this.tickBox = false
    console.log('Flag value:', this.showAdditionalColumns);
  }

  reviewToggle(){
    this.showAdditionalColumns = false;
    this.tickBox = false
  }

  pendingToggle(){
    this.showAdditionalColumns = false;
    this.tickBox = true
  }

  constructor(private http: HttpClient) {}

private pendingBtnUrl = 'http://167.172.220.75:8084/CashflowForecastingApplication/api/pending-list';
private reviewBtnUrl = 'http://167.172.220.75:8084/CashflowForecastingApplication/api/review-list';
private rejectBtnUrl = 'http://167.172.220.75:8084/CashflowForecastingApplication/api/rejected?page=0&size=2';

  rejectBtnApi(): void {
    this.loadRejectData().subscribe(
      (response) => {
        console.log('API Response:', response); // Debug statement
        this.results = response.data.content || []; // Ensure data structure is correct
      },
      (error) => {
        console.error('Search request failed', error);
      }
    );
  }

  private loadRejectData(): Observable<any> {
    return this.http.get<any>(this.rejectBtnUrl).pipe(
      catchError((error) => {
        console.error('Search request failed', error);
        return of({ data: [] }); // Return an empty result on error
      })
    );
  }

  pendingBtnApi(): void {
  this.loadPendingData().subscribe(
    (response) => {
      console.log('API Response:', response); // Debug statement
      this.results = response.data.content || []; // Ensure data structure is correct
    },
    (error) => {
      console.error('Search request failed', error);
    }
  );
}

reviewBtnApi(): void {
  this.loadReviewData().subscribe(
    (response) => {
      console.log('Review API Response:', response); // Debug statement
      this.results = response.data.content || []; // Ensure data structure is correct
    },
    (error) => {
      console.error('Review request failed', error);
    }
  );
}

private loadPendingData(): Observable<any> {
  return this.http.get<any>(this.pendingBtnUrl).pipe(
    catchError((error) => {
      console.error('Pending request failed', error);
      return of({ data: [] }); // Return an empty result on error
    })
  );
}

private loadReviewData(): Observable<any> {
  return this.http.get<any>(this.reviewBtnUrl).pipe(
    catchError((error) => {
      console.error('Review request failed', error);
      return of({ data: [] }); // Return an empty result on error
    })
  );
}



  

  
  
  
}


// authorize and rejecct all in only pending
// review ticck not