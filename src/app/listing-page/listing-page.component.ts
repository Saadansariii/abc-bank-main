import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { rejectSearch } from 'src/app/utils/api'

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css'],
})
export class ListingPageComponent {
  showAdditionalColumns: boolean = false;
  tickBox : boolean = false
  // selectedOption: string = '0';
  searchValue: string = '';
  results: any[] = [];
  // selectedValue: string = '0';
  data: any[] = [];
  // filteredData: any[] = [];
  // review : any [] = []


  ngOnInit(): void {
    // this.fetchData();
  }
  //
  handleButtonClick(): void {
    this.rejectBtnApi();
    this.toggleColumn();
    // this.rejectBtnSearchApi();
  }

  review(){
    this.reviewBtnApi();
    this.reviewToggle()
  }

  pending(){
    this.pendingBtnApi();
    this.pendingToggle()
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


  options = [
    { value: '0', label: 'Reference No' },
    { value: '1', label: 'Corporate Code' },
    { value: '2', label: 'Corporate Name' },
    { value: '3', label: 'Forecasting As' },
    { value: '4', label: 'Entry Type' },
  ];
  constructor(private http: HttpClient) {}

  search(){
    if(this.showAdditionalColumns === true){ 
     this.rejectBtnApi();
    }
    else{
     this.pendingBtnApi();
    }

  }

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



  // const url = rejectSearch ;

  
  
  
}