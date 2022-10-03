import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";

import {catchError, tap} from "rxjs/operators";
import { Rent } from '../models/rent';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  rentsURL = 'api/rents'

  constructor( private http: HttpClient) {
  }

  private log(message: string) {
    console.log(`rent service: ${message}`);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
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

  getRents(): Observable<Rent[]> {
    return this.http.get<Rent[]>(this.rentsURL)
      .pipe(
        tap(_ => this.log('fetched rents')),
        catchError(this.handleError<Rent[]>('getRents', []))
      );
  }

  /** GET rent by id. Will 404 if id not found */
  getRent(id: number): Observable<Rent> {
    const url = `${this.rentsURL}/${id}`;
    return this.http.get<Rent>(url).pipe(
      tap(_ => this.log(`fetched rent id=${id}`)),
      catchError(this.handleError<Rent>(`getRent id=${id}`))
    );
  }

  /** PUT: update the rent on the server */
  updateRent(rent: Rent): Observable<any> {
    return this.http.put(this.rentsURL, rent, this.httpOptions).pipe(
      tap(_ => this.log(`updated rent id=${rent.id}`)),
      catchError(this.handleError<any>('updateRent'))
    );
  }

  /** POST: add a new rent to the server */
  addRent(rent: Rent): Observable<Rent> {
    return this.http.post<Rent>(this.rentsURL, rent, this.httpOptions).pipe(
      tap((newRent: Rent) => this.log(`added rent w/ id=${newRent.id}`)),
      catchError(this.handleError<Rent>('addrent'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteRent(id: number): Observable<Rent> {
    const url = `${this.rentsURL}/${id}`;
    return this.http.delete<Rent>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted rent id=${id}`)),
      catchError(this.handleError<Rent>('deleteRent'))
    );
  }

}
