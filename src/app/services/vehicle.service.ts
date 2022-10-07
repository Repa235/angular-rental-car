import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Rent} from "../models/rent";
import {catchError, tap} from "rxjs/operators";
import {Vehicle} from "../models/vehicle";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  vehicleURL = 'api/vehicles'

  constructor(private http: HttpClient) {
  }


  private log(message: string) {
    console.log(`vehicle service: ${message}`);
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for rent consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.vehicleURL)
      .pipe(
        tap(_ => this.log('fetched rents')),
        catchError(this.handleError<Vehicle[]>('getVehicle', []))
      );
  }

  /** GET vehicle by id. Will 404 if id not found */
  getVehicle(id: number): Observable<Vehicle> {
    const url = `${this.vehicleURL}/${id}`;
    return this.http.get<Vehicle>(url)
      .pipe(
      tap(_ => this.log(`fetched vehicle id=${id}`)),
      catchError(this.handleError<Vehicle>(` id=${id}`))
    );
  }

  addOrUpdateVehicle(vehicle: Vehicle): Observable<any> {
    if (vehicle.id) {
      return this.http.put(this.vehicleURL, vehicle, this.httpOptions).pipe(
        tap(_ => this.log(`updated vehicle id=${vehicle.id}`)),
        catchError(this.handleError<any>('updateV')));
    } else {
      return this.http.post<User>(this.vehicleURL, vehicle, this.httpOptions).pipe(
        tap((newVehicle: User) => this.log(`added vehicle w/ id=${newVehicle.id}`)),
        catchError(this.handleError<User>('addV'))
      );
    }
  }
}
