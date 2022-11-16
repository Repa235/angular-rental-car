import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderComponent } from './components/templates/my-header/header.component';
import { MyFooterComponent } from './components/templates/my-footer/my-footer.component';

import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent} from "./components/forms/dynamic-forms/dynamic-form/dynamic-form.component";
import { DynamicFormQuestionComponent } from './components/forms/dynamic-forms/dynamic-form-question/dynamic-form-question.component';


import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import {AuthInterceptor} from "./interceptors/auth.interceptors";
import {RouteGuardService} from "./services/route-guard.service";
import {Roles} from "./models/roles";
import { SpinnerComponent } from './components/spinner/spinner.component';
import {NetworkInterceptor} from "./interceptors/network.interceptor";
import { SearchPipe } from './components/templates/my-table/pipes/search.pipe';
import { FormFatherComponent } from './components/forms/dynamic-forms/form-father/form-father.component';


@NgModule({
  declarations: [
    AppComponent,
    DynamicFormComponent, DynamicFormQuestionComponent,
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
    SpinnerComponent,
    SearchPipe,
    FormFatherComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'homepage', component: HomepageComponent},
      {path: 'form/father', component: FormFatherComponent},
      {path: 'form/dy/:formCateg/:idObj', component: FormFatherComponent},
      {path: 'form/dy/:formCateg', component: FormFatherComponent},

      {path: 'form/rent', component: RentFormComponent,  canActivate: [RouteGuardService],
        data: {roles: [Roles.user,Roles.admin]}},
      {path: 'form/rent/:idRent', component: RentFormComponent,  canActivate: [RouteGuardService],
        data: {roles: [Roles.user,Roles.admin]}},
      {path: 'form/user', component: UserFormComponent,  canActivate: [RouteGuardService],
        data: {roles: [Roles.user,Roles.admin]}},
      {path: 'form/user/:idUser', component: UserFormComponent,  canActivate: [RouteGuardService],
        data: {roles: [Roles.user,Roles.admin]}},
      {path: 'form/vehicle', component: VehicleFormComponent,  canActivate: [RouteGuardService],
        data: {roles: [Roles.admin]}},
      {path: 'form/vehicle/:idVehicle', component: VehicleFormComponent,  canActivate: [RouteGuardService],
        data: {roles: [Roles.user,Roles.admin]}},
      {path: 'list/user', component: UserListComponent,  canActivate: [RouteGuardService],
        data: {roles: [Roles.admin]}},
      {path: 'list/vehicle', component: VehicleListComponent},
      {path: 'list/rent', component: RentListComponent,  canActivate: [RouteGuardService],
        data: {roles: [Roles.user,Roles.admin]}},
      {path: 'list/rentOf/:user', component: RentListComponent,  canActivate: [RouteGuardService],
        data: {roles: [Roles.user,Roles.admin]}},
      {path: 'login', component: LoginFormComponent},
      {path: '', redirectTo: '/homepage', pathMatch: 'full'},
    ]),
    HttpClientModule,
    //HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
