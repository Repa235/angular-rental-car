import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { HeaderComponent } from './components/templates/my-header/header.component';
import { MyFooterComponent } from './components/templates/my-footer/my-footer.component';


import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService} from "./services/in-memory-data.service";

import {MyTableComponent} from "./components/templates/my-table/my-table.component";
import {MyButtonComponent} from "./components/templates/my-button/my-button.component";
import {PaginationPipe} from "./components/templates/my-table/pipes/pagination.pipe";
import {SortPipePipe} from "./components/templates/my-table/pipes/sort-pipe.pipe";


import { UserFormComponent } from './components/forms/user-form/user-form.component';
import { FormViewComponent } from './views/form-view/form-view.component';
import { VehicleFormComponent } from './components/forms/vehicle-form/vehicle-form.component';
import { RentFormComponent } from './components/forms/rent-form/rent-form.component';
import { ListViewComponent } from './views/list-view/list-view.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';



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
    FormViewComponent,
    VehicleFormComponent,
    RentFormComponent,
    ListViewComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'homepage', component: HomepageComponent},
      {path: 'list', component: ListViewComponent},
      {path: 'form', component: FormViewComponent},

      {path: '', redirectTo: '/homepage', pathMatch: 'full'},
    ]),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
