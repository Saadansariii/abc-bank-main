import { Component, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit , AfterViewInit {

  forecastPeriod: string = '';

  constructor(private cdr: ChangeDetectorRef,
    private http : HttpClient

  ) {}

  onDateChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const selectedDate = new Date(inputElement.value);

    if (!isNaN(selectedDate.getTime())) {
      // Calculate the end date (6 months later)
      const endDate = new Date(selectedDate);
      endDate.setMonth(endDate.getMonth() + 6);

      // Format the start and end dates
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const startDateFormatted = selectedDate.toLocaleDateString(
        undefined,
        options
      );
      const endDateFormatted = endDate.toLocaleDateString(undefined, options);

      // Update the forecast period
      this.forecastPeriod = `${startDateFormatted} - ${endDateFormatted}`;

      // Trigger change detection to ensure layout updates
      this.cdr.detectChanges();
    } else {
      this.forecastPeriod = 'Please select a valid date.';
    }
  }

  ngAfterViewInit(): void {
    // Initialize Donut Chart 1
    const canvas1 = document.getElementById('donutChart1') as HTMLCanvasElement;
    const ctx1 = canvas1?.getContext('2d');
    if (ctx1) {
      new Chart(ctx1, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              label: 'My Dataset',
              data: [300, 50, 100],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%', // Adjust this value to control the thickness of the donut
        },
      });
    }

    // Initialize Donut Chart 2
    const canvas2 = document.getElementById('donutChart2') as HTMLCanvasElement;
    const ctx2 = canvas2?.getContext('2d');
    if (ctx2) {
      new Chart(ctx2, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              label: 'Another Dataset',
              data: [200, 150, 250],
              backgroundColor: ['#4CAF50', '#9C27B0', '#FF9800'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%', // Adjust this value for the second chart as well
        },
      });
    }
  }

  // Function to toggle the table display when the button is clicked
  toggleTable(event: Event): void {
    const button = event.target as HTMLButtonElement | null; // Explicitly casting the event target
    if (button) {
      const accountCard = button.closest('.account-card');
      if (accountCard) {
        const table = accountCard.querySelector(
          '.monthly-balances'
        ) as HTMLTableElement;
        if (table) {
          if (table.style.display === 'none') {
            table.style.display = 'table';
            button.textContent = 'Hide Details';
          } else {
            table.style.display = 'none';
            button.textContent = 'View Details';
          }
        }
      }
    }
  }

  ngOnInit(): void {
    
  }

  balanceData : any [] = [] ;

  viewBalance(){
    this.http.get('http://167.172.220.75:8084/CashflowForecastingApplication/api/transactions').subscribe((res : any)=> {
      this.balanceData = res.data.content
    })
  }

  
}