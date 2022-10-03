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
import { ProfileComponent } from './views/profile/profile.component';
import { MyHeaderProfileComponent } from './components/templates/my-header-profile/my-header-profile.component';
import {MyTableComponent} from "./components/templates/my-table/my-table.component";
import {MyButtonComponent} from "./components/templates/my-button/my-button.component";
import {PaginationPipe} from "./components/templates/my-table/pipes/pagination.pipe";
import {SortPipePipe} from "./components/templates/my-table/pipes/sort-pipe.pipe";
import { UserListComponent } from './components/lists/user-list/user-list.component';
import { RentListComponent } from './components/lists/rent-list/rent-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    MyFooterComponent,
    ProfileComponent,
    MyHeaderProfileComponent,
    MyTableComponent,
    MyButtonComponent,
    PaginationPipe,
    SortPipePipe,
    UserListComponent,
    RentListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'homepage', component: HomepageComponent},
      {path: 'profile', component: ProfileComponent},

      {path: '', redirectTo: '/homepage', pathMatch: 'full'},
    ]),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
