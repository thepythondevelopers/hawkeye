import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginWithFacebookComponent } from './login-with-facebook/login-with-facebook.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProfileVisitsVisualsComponent } from './profile-visits-visuals/profile-visits-visuals.component';
import { ReachComponent } from './reach/reach.component';
import { SignupComponent } from './signup/signup.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path : 'dashboard', component : DashboardComponent},
  {path : 'charts', component : TestComponent},
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
