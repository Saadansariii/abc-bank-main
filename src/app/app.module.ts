import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SummaryComponent } from './summary/summary.component'; 
import { ManualThreeRowComponent } from './manual-three-row/manual-three-row.component';
import { RejectedPageComponent } from './rejected-page/rejected-page.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { ManualForecastComponent } from './listing-page/manual-forecast.component';
import { ListingPageComponent } from './listing-page/listing-page.component';

@NgModule({
    declarations: [
      AppComponent,
      NavbarComponent,
      HomeComponent,
      SummaryComponent,
      // ManualForecastComponent,
      // ManualThreeRowComponent,
      RejectedPageComponent,
      ListingPageComponent,
      
      
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
