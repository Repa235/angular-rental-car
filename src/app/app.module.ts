import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderComponent } from './components/templates/my-header/header.component';
import { MyFooterComponent } from './components/templates/my-footer/my-footer.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService} from "./services/in-memory-data.service";
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    MyFooterComponent,
    LoginFormComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'homepage', component: HomepageComponent},
      {path: 'form-login', component: LoginFormComponent},
      {path: 'profile', component: ProfileComponent},
      {path: '', redirectTo: '/homepage', pathMatch: 'full'},
    ]),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
