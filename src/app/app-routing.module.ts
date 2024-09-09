import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SummaryComponent } from './summary/summary.component';
// import { ManualForecastComponent } from './listing-page/manual-forecast.component';
import { ManualFourRowComponent } from './manual-four-row/manual-four-row.component';
import { ManualThreeRowComponent } from './manual-three-row/manual-three-row.component';
import { RejectedPageComponent } from './rejected-page/rejected-page.component';
import { ListingPageComponent } from './listing-page/listing-page.component';
import { ReviewComponent } from './review/review.component';
import { SummaryViewComponent } from './summary-view/summary-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route to HomeComponent
  { path: 'summary', component: SummaryComponent }, // Route for the SummaryComponent
  // { path: 'listing-page', component: ManualForecastComponent }, // Route for ManualForecastComponent
  { path: 'manual-four', component: ManualFourRowComponent }, // Route for ManualFourRowComponent
  { path: 'manual-three', component: ManualThreeRowComponent }, // Route for ManualThreeRowComponent
  { path: 'rejected-list', component: RejectedPageComponent },
  // { path: '', redirectTo: '/manual-forecast', pathMatch: 'full' },
  { path: 'summary-view/:year/:month', component: SummaryViewComponent }, // Updated route with parameters
  // { path: '', redirectTo: '/summary-view', pathMatch: 'full' },
  {path : 'listing-page' , component : ListingPageComponent},
  {path : 'review' , component : ReviewComponent},
  {path : 'summary-view' , component : SummaryViewComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Registers the routes
  exports: [RouterModule] // Makes RouterModule available throughout the app
})
export class AppRoutingModule { }
