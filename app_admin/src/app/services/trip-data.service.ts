import { Injectable } from "@angular/core"; // import the Injectable decorator
import { Http } from "@angular/http";

import { Trip } from "../models/trip"; // import the Trip interface

@Injectable()
export class TripDataService {

  constructor(private http: Http) { } // inject the Http service

  private apiBaseUrl = 'http://localhost:3000/api/'; // define the API base URL
  private tripsUrl = `${this.apiBaseUrl}trips/`; // define the trips URL

  // implement the method to add a trip to the API
  public addTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#addTrip');
    return this.http
      .post(this.tripsUrl, formData) // template string
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  // implement the method to get all trips from the API
  public getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.http
      .get(this.tripsUrl) // template string
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  // implement the method to get a single trip from the API
  public getTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#getTrip(tripCode)');
    return this.http
      .get(this.tripsUrl + tripCode) // template string
      .toPromise()
      .then(response => response.json() as Trip)  
      .catch(this.handleError);
  }

  // implement the method to update a trip in the API
  public updateTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#updateTrip');
    console.log(formData);
    return this.http
      .put(this.tripsUrl + formData.code, formData) // template string
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  // implement the method to delete a trip from the API
  public deleteTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#deleteTrip');
    return this.http
      .delete(this.tripsUrl + tripCode) // template string
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  // 
  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}