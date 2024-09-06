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
  // selectedOption: string = '0';
  searchValue: string = '';
  results: any[] = [];
  selectedValue: string = '0';
  data: any[] = [];
  filteredData: any[] = [];


  ngOnInit(): void {
    this.fetchData();
  }
  //
  handleButtonClick(): void {
    this.rejectBtnApi();
    this.toggleColumn();
    this.rejectBtnSearchApi();
  }
  toggleColumn() {
    this.showAdditionalColumns = !this.showAdditionalColumns;
    console.log('Flag value:', this.showAdditionalColumns);
  }
  options = [
    { value: '0', label: 'Reference No' },
    { value: '1', label: 'Corporate Code' },
    { value: '2', label: 'Corporate Name' },
    { value: '3', label: 'Forecasting As' },
    { value: '4', label: 'Entry Type' },
  ];
  constructor(private http: HttpClient) {}
  //  reject button function

  private rejectBtnUrl = 'http://122.170.5.148:8080/api/rejected?page=0&size=2';
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
  // reject search api
  // private rejectSearch = 'http://122.170.5.148:8080/api/rejected/search'
  rejectBtnSearchApi(): void {}
  fetchData(): void {
    this.http
      .get<any[]>('http://122.170.5.148:8080/api/rejected/search')
      .subscribe(
        (response) => {
          this.data = response;
          this.filterData();
        },
        (error) => console.error('Error fetching data:', error)
      );
  }
  onSelectionChange(event: any): void {
    this.selectedValue = event.target.value;
    this.filterData();
  }
  filterData(): void {
    this.filteredData = this.data.filter((item) => {
      switch (this.selectedValue) {
        case '0':
          return item.referenceNo;
        case '1':
          return item.corporateCode;
        case '2':
          return item.corporateName;
        case '3':
          return item.forecastingAs;
        case '4':
          return item.entryType;
        default:
          return true;
      }
    });
  }


  search(){
    if(this.showAdditionalColumns === true){ 
     this.rejectBtnApi();
    }
    else{
     this.pendingBtnApi();
    }

  }

  // pending button function
  private pendingBtnUrl = 'http://122.170.5.148:8080/api/pending-list?page=0&size=92';
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
  private loadPendingData(): Observable<any> {
    return this.http.get<any>(this.pendingBtnUrl).pipe(
      catchError((error) => {
        console.error('Search request failed', error);
        return of({ data: [] }); // Return an empty result on error
      })
    );
     
  }

  // const url = rejectSearch ;

  // search(){

  // }
  
}