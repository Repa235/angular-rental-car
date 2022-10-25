import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderComponent } from './components/templates/my-header/header.component';
import { MyFooterComponent } from './components/templates/my-footer/my-footer.component';


import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService} from "./services/in-memory-data.service";

import {MyTableComponent} from "./components/templates/my-table/my-table.component";
import {MyButtonComponent} from "./components/templates/my-button/my-button.component";
import {PaginationPipe} from "./components/templates/my-table/pipes/pagination.pipe";
import {SortPipePipe} from "./components/templates/my-table/pipes/sort-pipe.pipe";


import { UserFormComponent } from './components/forms/user-form/user-form.component';

import { VehicleFormComponent } from './components/forms/vehicle-form/vehicle-form.component';
import { RentFormComponent } from './components/forms/rent-form/rent-form.component';

import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import {FormsModule} from "@angular/forms";
import { UserListComponent } from './components/lists/user-list/user-list.component';
import { VehicleListComponent } from './components/lists/vehicle-list/vehicle-list.component';
import { RentListComponent } from './components/lists/rent-list/rent-list.component';
import {AuthInterceptor} from "../interceptors/auth.interceptors";



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    MyFooterComponent,
    MyTableComponent,
    MyButtonComponent,
    PaginationPipe,
    SortPipePipe,
    UserFormComponent,

    VehicleFormComponent,
    RentFormComponent,

    LoginFormComponent,
    UserListComponent,
    VehicleListComponent,
    RentListComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'homepage', component: HomepageComponent},
      {path: 'form/login', component: LoginFormComponent},
      {path: 'form/rent', component: RentFormComponent},
      {path: 'form/rent/:idRent', component: RentFormComponent},
      {path: 'form/user', component: UserFormComponent},
      {path: 'form/user/:idUser', component: UserFormComponent},
      {path: 'form/vehicle', component: VehicleFormComponent},
      {path: 'form/vehicle/:idVehicle', component: VehicleFormComponent},
      {path: 'list/user', component: UserListComponent},
      {path: 'list/vehicle', component: VehicleListComponent},
      {path: 'list/rent', component: RentListComponent},
      {path: 'login', component: LoginFormComponent},


      {path: '', redirectTo: '/homepage', pathMatch: 'full'},
    ]),
    HttpClientModule,
    //HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
    FormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
