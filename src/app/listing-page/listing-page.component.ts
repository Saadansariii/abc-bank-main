import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { rejectSearch } from 'src/app/utils/api';
import { response } from 'express';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css'],
})
export class ListingPageComponent implements OnInit {
  showAdditionalColumns: boolean = false;
  tickBox: boolean = false;
  rejectAll: boolean = false;
  authorizeAll: boolean = false;
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

  // search2() {
  //   if (!this.currentStatus) {
  //     alert('Please select Any One Of This Reject, Pending, or Review first');
  //     console.log('Please select Reject, Pending, or Review first');
  //     return;
  //   }

  //   if (!this.searchValue) {
  //     console.log('Please enter a search value');
  //     return;
  //   }

  //   console.log(this.searchValue, 'search value');

  //   let searchParam: string;
  //   switch (this.selectedOption) {
  //     case 0:
  //       searchParam = 'referenceNo';
  //       break;
  //     case 1:
  //       searchParam = 'corporateCode';
  //       break;
  //     case 2:
  //       searchParam = 'corporateName';
  //       break;
  //     case 3:
  //       searchParam = 'forecastingAs';
  //       break;
  //     case 4:
  //       searchParam = 'entryType';
  //       break;
  //     default:
  //       searchParam = '';
  //   }

  //   let apiUrl: string;
  //   const baseUrl =
  //     'http://167.172.220.75:8084/CashflowForecastingApplication/api';

  //   switch (this.currentStatus) {
  //     case 'rejected':
  //       apiUrl = `${baseUrl}/rejected/search`;
  //       break;
  //     case 'pending':
  //       apiUrl = `${baseUrl}/pending-list/search`;
  //       break;
  //     case 'review':
  //       apiUrl = `${baseUrl}/review-list/search`;
  //       break;
  //     default:
  //       console.log('Invalid status');
  //       return;
  //   }

  //   const params = { [searchParam]: this.searchValue };

  //   this.http.get(apiUrl, { params: params }).subscribe(
  //     (response: any) => {
  //       console.log('Search results:', response);
  //       if (response.code === 200 && response.data && response.data.content) {
  //         this.results = response.data.content;
  //       } else {
  //         alert('Data Not Found');
  //         console.error(
  //           'No data found or error in response:',
  //           response.message
  //         );
  //         this.results = [];
  //       }
  //     },
  //     (error) => {
  //       console.error('Error occurred during search:', error);
  //       this.results = [];
  //       alert('You Select Wrong Input ');
  //     }
  //   );
  // }

  searchParam = '';
  search() {
    if (!this.currentStatus) {
      alert('Please select Any One Of This Reject, Pending, or Review first');
      console.log('Please select Reject, Pending, or Review first');
      return;
    }

    if (!this.searchValue) {
      console.log('Please enter a search value');
      return;
    }

    let selectedOption2 = this.selectedOption;

    console.log(this.selectedOption, 'this.selectedOption');
    console.log(this.searchValue, 'this.searchValue');

    let apiUrl = '';
    const baseUrl =
      'http://167.172.220.75:8084/CashflowForecastingApplication/api';

    if (selectedOption2 === 0) {
      this.searchParam = 'referenceNo';
    }
    if (selectedOption2 === 1) {
      this.searchParam = 'corporateCode';
    }
    if (selectedOption2 === 2) {
      this.searchParam = 'corporateName';
    }
    if (selectedOption2 === 3) {
      this.searchParam = 'forecastingAs';
    }
    if (selectedOption2 === 4) {
      this.searchParam = 'entryType';
    }
    if (this.currentStatus === 'rejected') {
      apiUrl =
        baseUrl +
        '/rejected/search?' +
        this.searchParam +
        '=' +
        this.searchValue;
    }
    if (this.currentStatus === 'pending') {
      apiUrl =
        baseUrl +
        '/pending-list/search?' +
        this.searchParam +
        '=' +
        this.searchValue;
    }
    if (this.currentStatus === 'review') {
      apiUrl =
        baseUrl +
        '/review-list/search?' +
        this.searchParam +
        '=' +
        this.searchValue;
    }
    apiUrl + '&page=0&size=2';

    console.log(apiUrl, 'apiUrl');

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        console.log('Search results:', response);
        if (response.code === 200 && response.data && response.data.content) {
          this.results = response.data.content;
        } else {
          alert('Data Not Found');
          console.error(
            'No data found or error in response:',
            response.message
          );
          this.results = [];
        }
      },
      (error) => {
        console.error('Error occurred during search:', error);
        this.results = [];
        alert('You Select Wrong Input ');
      }
    );
  }

  // button
  rejectBtn() { 
    this.rejectAll = false;
    this.authorizeAll = false;
    console.log(this.selectedOption, 'selectedOption');
    this.rejectBtnApi();
    this.setStatus('rejected');
    this.search();
    this.showAdditionalColumns = true;
    this.tickBox = false;
    console.log('Flag value:', this.showAdditionalColumns);
  }

  reviewBtn() { 
    this.showAdditionalColumns = true;
    this.tickBox = false;
    this.rejectAll = false;
    this.authorizeAll = false;
    console.log(this.selectedOption, 'selectedOption');
    this.reviewBtnApi();
    this.setStatus('review');
    this.search();
  }

  pendingBtn() {
    console.log(this.selectedOption, 'selectedOption');
    // this.pendingBtnApi(); 
    this.rejectAll = true;
    this.authorizeAll = true;
    this.showAdditionalColumns = false;
    this.tickBox = true;
    this.setStatus('pending');
    this.search();
  }


  

  constructor(private http: HttpClient) {}
  ngOnInit(){
    throw new Error('Method not implemented.');
    // this.pendingBtnUrl()
  }

  // manual show the pending url 
  



  // url for api
  private pendingBtnUrl =
    'http://167.172.220.75:8084/CashflowForecastingApplication/api/pending-list';
  private reviewBtnUrl =
    'http://167.172.220.75:8084/CashflowForecastingApplication/api/review-list';
  private rejectBtnUrl =
    'http://167.172.220.75:8084/CashflowForecastingApplication/api/rejected';

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

  

  // pendingBtnApi(): void {
  //   this.loadPendingData().subscribe(
  //     (response) => {
  //       console.log('API Response:', response); // Debug statement
  //       this.results = response.data.content || []; // Ensure data structure is correct
  //     },
  //     (error) => {
  //       console.error('Search request failed', error);
  //     }
  //   );
  // }

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

  // private loadPendingData(): Observable<any> {
  //   return this.http.get<any>(this.pendingBtnUrl).pipe(
  //     catchError((error) => {
  //       console.error('Pending request failed', error);
  //       return of({ data: [] }); // Return an empty result on error
  //     })
  //   );
  // }

  private loadReviewData(): Observable<any> {
    return this.http.get<any>(this.reviewBtnUrl).pipe(
      catchError((error) => {
        console.error('Review request failed', error);
        return of({ data: [] }); // Return an empty result on error
      })
    );
  }
}
