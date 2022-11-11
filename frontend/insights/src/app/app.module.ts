import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ReachComponent } from './reach/reach.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import {NgChartsModule} from 'ng2-charts';
import { LoginWithFacebookComponent } from './login-with-facebook/login-with-facebook.component';
import { TestComponent } from './test/test.component';
import { ProfileVisitsVisualsComponent } from './profile-visits-visuals/profile-visits-visuals.component';
import { FollowersDetailsVisualsComponent } from './followers-details-visuals/followers-details-visuals.component';
import { NewfollwersComponent } from './newfollwers/newfollwers.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ReachComponent,
    SignupComponent,
    NotfoundComponent,
    ForgotPasswordComponent,
    LoginWithFacebookComponent,
    TestComponent,
    ProfileVisitsVisualsComponent,
    FollowersDetailsVisualsComponent,
    NewfollwersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
    NgChartsModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('643056750524188')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
