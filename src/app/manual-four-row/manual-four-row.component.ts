import { Component, OnInit, AfterViewInit, Renderer2, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manual-four-row',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, ReactiveFormsModule, HttpClientModule,FormsModule ],
  templateUrl: './manual-four-row.component.html',
  styleUrls: ['./manual-four-row.component.css']
})
export class ManualFourRowComponent implements OnInit, AfterViewInit {

  forecastForm!: FormGroup;

  private apiUrl = 'http://167.172.220.75:8084/CashflowForecastingApplication/api/forecasts';

  corporateCode: string = '';
  corporateName: string = '';
  forecastingAs: string = '';
  entryType: string = '';
  narration: string = '';
  description: string = '';
  mode: string = '';
  beneficiaryPayers: string = '';
  // accountType: string = '';
  accountNumber: string = '';
  forecastedAmount: number = 0;
  currency: string = 'INR';
  lockRecord: boolean = true;
  valueDate: string = '';
  recurringFrom: string = '';
  recurringTo: string = '';
  recurringPattern: string = '';
 
  
  accountTypes : any [] =[] ;
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  searchBy: string = 'corporateCode';
  apiAllUrl = 'http://167.172.220.75:8084/CashflowForecastingApplication/api/corporate/all';
  apiSearchByCodeUrl = 'http://167.172.220.75:8084/CashflowForecastingApplication/api/corporate/corporate-code';
  apiSearchByNameUrl = 'http://167.172.220.75:8084/CashflowForecastingApplication/api/corporate/corporate-name';
  accountOptions = {
    internalAccount: [
      { value: 'internalAcc001', text: 'Internal Acc 001' },
      { value: 'internalAcc002', text: 'Internal Acc 002' }
    ],
    externalAccount: [
      { value: 'externalAcc001', text: 'External Acc 001' },
      { value: 'externalAcc002', text: 'External Acc 002' }
    ]
  };
 // Define the mode options
modeOptions = {
  inwardPayment: [
    { value: 'accountDeposit', text: 'Account Deposit' },
    { value: 'cash', text: 'Cash' }
  ],
  outwardPayment: [
    { value: 'accountWithdrawal', text: 'Account Withdrawal' },
    { value: 'cash', text: 'Cash' }
  ]
};

modeOptionsList: { value: string; text: string; }[] = [];

// Your form data structur

// Event handler for forecastingAs change
onForecastingAsChange(event: any): void {
  const selectedForecastingAs = event.target.value;

  // Update modeOptionsList based on selected forecastingAs
  if (selectedForecastingAs === 'Inward Payment') {
    this.modeOptionsList = this.modeOptions.inwardPayment;
  } else if (selectedForecastingAs === 'Outward Payment') {
    this.modeOptionsList = this.modeOptions.outwardPayment;
  } else {
    this.modeOptionsList = [];  // Reset if nothing is selected
  }
}


  @ViewChild('entryType', { static: false }) entryTypeSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('accountType', { static: false }) accountTypeSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('accountNumber', { static: false }) accountNumberSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('forecastingAs', { static: false }) forecastingAsSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('mode', { static: false }) modeSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('searchBy', { static: false }) searchBySelect!: ElementRef<HTMLSelectElement>;

  constructor(
    private http: HttpClient,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {
  
    
  }

  formData = {
    corporateCode: '',
    corporateName: '',
    forecastingAs: '',
    forecastCurrency: 'INR',
    entryType: '',
    narration: '',
    description: '',
    mode: '',
    beneficiaryPayers: '',
    accountType: '',
    accountNumber: '',
    forecastedAmount: '',
    lockRecord: false,
    valueDate: '',
    recurringFrom: '',
    recurringTo: '',
    recurringPattern: ''
  };

  ngOnInit(): void {
    this.corporateCodeAllDetail();
    this.loadAccountNumbers('internal Account');
    this.loadAccountNumbers('externalAccount');
  }
  ngAfterViewInit(): void {
    this.checkElementAvailability();
    this.setupDropdownListeners();
    this.toggleValueDate(); // Initial call if needed to set the correct fields visibility on load
  }
  checkElementAvailability(): void {
    console.log('entryTypeSelect:', this.entryTypeSelect);
    console.log('accountTypeSelect:', this.accountTypeSelect);
    console.log('accountNumberSelect:', this.accountNumberSelect);
    console.log('forecastingAsSelect:', this.forecastingAsSelect);
    console.log('modeSelect:', this.modeSelect);
    console.log('searchBySelect:', this.searchBySelect);
  }
  corporateCodeAllDetail(): void {
    this.http.get(this.apiAllUrl).pipe(
      catchError((error) => {
        console.error('Error fetching corporate details', error);
        return throwError(() => new Error('Error fetching corporate details'));
      })
    ).subscribe(
      (result: any) => {
        if (result && result.data) {
          console.log(result.data,"apihit ornot")
          // Display only the first 3 entries from result.data
          this.users = result.data.slice(0, 3);
          this.filteredUsers = [...this.users];
        } else {
          console.error('Unexpected response structure', result);
        }
      },
      (error) => console.error('Subscription error', error)
    );
  }
  
  searchByCorporateCode(corporateCode: string): void {
    if (corporateCode) {
      this.http.get(`${this.apiSearchByCodeUrl}/${corporateCode}`).pipe(
        catchError((error) => {
          console.error('Error fetching user details by code', error);
          return throwError(() => new Error('Error fetching user details by code'));
        })
      ).subscribe(
        (result: any) => {
          if (result && result.data && result.data.length > 0) {
            this.filteredUsers = [result.data[0]];
          } else {
            this.filteredUsers = [];
            console.error('No matching user found by code', result);
          }
          this.cdr.detectChanges();
        },
        (error) => console.error('Subscription error', error)
      );
    } else {
      this.filteredUsers = [...this.users];
      this.cdr.detectChanges();
    }
  } 
  
openPopup(){
  console.log("shivani")
  this.corporateCodeAllDetail();
  
}
  searchByCorporateName(corporateName: string): void {
    if (corporateName) {
      const url = `${this.apiSearchByNameUrl}/${encodeURIComponent(corporateName)}`;
      this.http.get(url).pipe(
        catchError((error) => {
          console.error('Error fetching user details by name', error);
          return throwError(() => new Error('Error fetching user details by name'));
        })
      ).subscribe(
        (result: any) => {
          console.log('Search by name result:', result); // Debug output
          if (result && result.data && result.data.length > 0) {
            this.filteredUsers = [result.data[0]];
          } else {
            this.filteredUsers = [];
            console.error('No matching user found by name', result);
          }
          this.cdr.detectChanges();
        },
        (error) => console.error('Subscription error', error)
      );
    } else {
      this.filteredUsers = [...this.users];
      this.cdr.detectChanges();
    }
  }
  onSearchClick(): void {
    if (this.searchBy === 'corporateCode') {
      this.searchByCorporateCode(this.searchTerm);
    } else if (this.searchBy === 'corporateName') {
      this.searchByCorporateName(this.searchTerm);
    }
  }
  setupDropdownListeners(): void {
    if (this.forecastingAsSelect) {
      this.renderer.listen(this.forecastingAsSelect.nativeElement, 'change', (event: Event) => {
        const selectedForecasting = (event.target as HTMLSelectElement).value;
        this.updateModeOptions(selectedForecasting);
      });
    } else {
      console.error('forecastingAsSelect is not available');
    }
    if (this.accountTypeSelect) {
      this.renderer.listen(this.accountTypeSelect.nativeElement, 'change', (event: Event) => {
        const selectedType = (event.target as HTMLSelectElement).value;
        this.updateAccountNumberOptions(selectedType);
      });
    } else {
      console.error('accountTypeSelect is not available');
    }
    if (this.searchBySelect) {
      this.renderer.listen(this.searchBySelect.nativeElement, 'change', (event: Event) => {
        this.searchBy = (event.target as HTMLSelectElement).value;
      });
    } else {
      console.error('searchBySelect is not available');
    }
    if (this.modeSelect) {
      this.renderer.listen(this.modeSelect.nativeElement, 'change', (event: Event) => {
        // Handle mode selection if needed
      });
    } else {
      console.error('modeSelect is not available');
    }

    if (this.accountTypeSelect) {
      this.renderer.listen(this.accountTypeSelect.nativeElement, 'change', (event: Event) => {
        const selectedType = (event.target as HTMLSelectElement).value;
        console.log('Selected account type:', selectedType); // Debug: Log the selected type
        // Call function to load account numbers based on selected type
        this.loadAccountNumbers(selectedType);
      });
    } else {
      console.error('accountTypeSelect is not available');
    }
  }
  
 
  toggleValueDate(): void {
    const entryType = (document.getElementById('entryType') as HTMLSelectElement).value;
    const valueDateField = document.getElementById('valueDateField') as HTMLElement;
    const recurringFieldsFrom = document.getElementById('recurringFieldsFrom') as HTMLElement;
    const recurringFieldsTo = document.getElementById('recurringFieldsTo') as HTMLElement;
    const recurringFieldsPattern = document.getElementById('recurringFieldsPattern') as HTMLElement;
  
    console.log('Entry Type:', entryType);
  
    if (entryType === 'O') {
      valueDateField.style.display = 'block';
      recurringFieldsFrom.style.display = 'none';
      recurringFieldsTo.style.display = 'none';
      recurringFieldsPattern.style.display = 'none';
    } else if (entryType === 'R') {
      valueDateField.style.display = 'none';
      recurringFieldsFrom.style.display = 'block';
      recurringFieldsTo.style.display = 'block';
      recurringFieldsPattern.style.display = 'block';
    } else {
      valueDateField.style.display = 'none';
      recurringFieldsFrom.style.display = 'none';
      recurringFieldsTo.style.display = 'none';
      recurringFieldsPattern.style.display = 'none';
    }
  }
  
  updateAccountNumberOptions(selectedType: string): void {
    const accountNumberSelect = this.accountNumberSelect.nativeElement;
    accountNumberSelect.innerHTML = '<option value="" selected>Please Select</option>';
    const options = this.accountOptions[selectedType as keyof typeof this.accountOptions] || [];
    options.forEach((option) => {
      const opt = this.renderer.createElement('option');
      opt.value = option.value;
      opt.textContent = option.text;
      this.renderer.appendChild(accountNumberSelect, opt);
    });
  }
  updateModeOptions(selectedForecasting: string): void {
    const modeSelect = this.modeSelect.nativeElement;
    modeSelect.innerHTML = '<option value="" selected>Please Select</option>';
    const options = this.modeOptions[selectedForecasting as keyof typeof this.modeOptions] || [];
    options.forEach((option) => {
      const opt = this.renderer.createElement('option');
      opt.value = option.value;
      opt.textContent = option.text;
      this.renderer.appendChild(modeSelect, opt);
    });
  }
  refreshData(): void {
    this.corporateCodeAllDetail();
  }
  selectRow(user: any): void { 
    console.log(user,'user');
    this.formData.corporateCode =  user.corporateCode;
    this.formData.corporateName =  user.corporateName; 
  }
  onSearchInput(): void {
    console.log('Search term:', this.searchTerm);

    
  }

  submitForm(): void {
    console.log("hello sir " ,this.formData);
    this.http.post('http://167.172.220.75:8084/CashflowForecastingApplication/api/forecasts', this.formData).pipe(
      catchError((error) => {
        console.error('Error occurred while saving the forecast:', error);
        return throwError(error);
      })
    ).subscribe((response) => {
      console.log('Forecast saved successfully:', response);
      // Optionally, you can reset the form or provide feedback to the user here
    });
  } 
  
  // new api for by type 

  loadAccountNumbers(selectedType: string): void {
    const corporateId = 3; // Assuming corporate ID is constant or obtained elsewhere
    let encodedType = encodeURIComponent(selectedType.trim()); // Encode to handle spaces and special characters
    // Convert encoded type to the required API values
    if (encodedType === "internal Account") {
      encodedType = "Internal Account";
    } else if (encodedType === "externalAccount") {
      encodedType = "External Account";
    }
    const url = `http://167.172.220.75:8084/CashflowForecastingApplication/api/accounts/by-type?accountType=${encodeURIComponent(encodedType)}&corporateId=${corporateId}`;
    console.log('Fetching account numbers with URL:', url); // Log the request URL for debugging
    this.http.get<any>(url).pipe(
      catchError((error: any) => {
        console.error('Error fetching account numbers:', error); // Log any errors encountered
        return throwError(() => new Error('Error fetching account numbers')); // Handle the error
      })
    ).subscribe(
      (result: any) => {
        console.log('API response:', result); // Log the API response to inspect its structure
        if (result && result.data) {
          // Assuming result.data is an array of objects with accountNumber and id
          this.accountTypes = result.data.map((item: any) => ({
            value: item.accountNumber, // Use accountNumber as the value
            text: item.accountNumber   // Use accountNumber as the display text
          }));
        } else {
          this.accountTypes = [];
          console.error('Unexpected response structure:', result); // Log if the response is null or unexpected
        }
        this.cdr.detectChanges(); // Update the view with new data
      },
      (error: any) => {
        console.error('Subscription error:', error); // Log any subscription errors
      }
    );
  }
}