import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Rent} from "../models/rent";
import {catchError, tap} from "rxjs/operators";
import {Vehicle} from "../models/vehicle";
import {User} from "../models/user";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  vehicleURL = environment.apiURI + '/api/vehicle'

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
        tap(_ => this.log('fetched vehicles')),
        catchError(this.handleError<Vehicle[]>('getVehicle', []))
      )
  }

  /** GET vehicle by id. Will 404 if id not found */
  getVehicle(id: number): Observable<Vehicle> {
    const url = `${this.vehicleURL}/get/${id}`;
    return this.http.get<Vehicle>(url)
      .pipe(
        tap(_ => this.log(`fetched vehicle id=${id}`)),
        catchError(this.handleError<Vehicle>(` id=${id}`))
      );
  }

  retVehicle(id: number): Vehicle {
    let v: any = {}
    this.getVehicle(id).subscribe(res => v=res)
    return v
  }

  /** GET vehicle by id. Will 404 if id not found */
  getFreeVehicles(dates: any): Observable<Vehicle[]> {
    const url = `${this.vehicleURL}/free`;
    return this.http.post<Vehicle[]>(url, dates, this.httpOptions)
      .pipe(tap((_ => this.log("Veicoli trovati"))),
        catchError(this.handleError<Vehicle[]>('!??')
        ));
  }

  /** POST: add a new Vehicle to the server */
  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    this.log('Adding vehicle: ' + vehicle.carBrand + '' + vehicle.model)
    return this.http.post<Vehicle>(this.vehicleURL + "/addOrUpdate", vehicle, this.httpOptions).pipe(
      tap((newVehicle: Vehicle) => this.log(`added Vehicle w/ id=${newVehicle.id}`)),
      catchError(this.handleError<Vehicle>('addVehicle'))
    );
    this.log('Added')
  }

  /** PUT: update the Vehicle on the server */
  updateVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.put(this.vehicleURL + "/addOrUpdate", vehicle, this.httpOptions).pipe(
      tap(_ => this.log(`updated Vehicle id=${vehicle.id}`)),
      catchError(this.handleError<any>('updateVehicle'))
    );
  }

  /** DELETE: delete the Vehicle from the server */
  deleteVehicle(id: number): Observable<Vehicle[]> {
    const url = `${this.vehicleURL}/remove/${id}`;
    return this.http.delete<Vehicle[]>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Vehicle id=${id}`)),
      catchError(this.handleError<Vehicle[]>('deleteVehicle'))
    );
  }
}
