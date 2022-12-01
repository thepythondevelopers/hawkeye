import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelComponent } from './cancel/cancel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FollowerDetailsInsightsComponent } from './follower-details-insights/follower-details-insights.component';
import { FollowersDetailsVisualsComponent } from './followers-details-visuals/followers-details-visuals.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ImpressionCalenderComponent } from './impression-calender/impression-calender.component';
import { LoginWithFacebookComponent } from './login-with-facebook/login-with-facebook.component';
import { LoginComponent } from './login/login.component';
import { NewfollwersComponent } from './newfollwers/newfollwers.component';
import { NewpostCalenderComponent } from './newpost-calender/newpost-calender.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PricingComponent } from './pricing/pricing.component';
import { ProfileVisitsCalenderComponent } from './profile-visits-calender/profile-visits-calender.component';
import { ProfileVisitsVisualsComponent } from './profile-visits-visuals/profile-visits-visuals.component';
import { ReachCalenderComponent } from './reach-calender/reach-calender.component';
import { ReachComponent } from './reach/reach.component';
import { SignupComponent } from './signup/signup.component';
import { SuccessComponent } from './success/success.component';
import { TestComponent } from './test/test.component';
import { WebsiteClicksInsightsComponent } from './website-clicks-insights/website-clicks-insights.component';

const routes: Routes = [
  {path : 'dashboard', component : DashboardComponent},
  {path : 'followers-details/:id', component : FollowerDetailsInsightsComponent},
  {path : 'charts', component : TestComponent},
  {path : 'payment/success', component : SuccessComponent},
  {path : 'payment/cancel', component : CancelComponent},
  {path : 'reach/calender', component : ReachCalenderComponent},
  {path : 'pricing', component : PricingComponent},
  {path : 'profile-visits/calender', component : ProfileVisitsCalenderComponent},
  {path : 'wbcs/calender', component : WebsiteClicksInsightsComponent},
  {path : 'newpost/calender', component : NewpostCalenderComponent},
  {path : 'impression/calender', component : ImpressionCalenderComponent},
  {path : 'dashboard/newfollowers-visuals', component : NewfollwersComponent},
  {path : 'forgot_password', component : ForgotPasswordComponent},
  {path : 'login', component : LoginComponent},
  {path : 'signup', component : SignupComponent},
  {path : 'reach', component : ReachComponent},
  {path : 'notfound', component : NotfoundComponent},
  {path : 'login-with-facebook', component : LoginWithFacebookComponent},
  {path : '', redirectTo : '/signup', pathMatch : 'full'},
  {path : '**', redirectTo : '/notfound', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
