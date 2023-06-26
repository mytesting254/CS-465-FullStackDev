import { Injectable, Inject } from "@angular/core"; // import the Injectable decorator
import { Http, Headers, RequestOptions, RequestMethod } from "@angular/http";

import { Trip } from "../models/trip"; // import the Trip interface
import { BROWSER_STORAGE } from "../storage"; // import the BROWSER_STORAGE token
import { AuthResponse } from "../models/authresponse"; // import the AuthResponse interface
import { User } from "../models/user"; // import the User interface

@Injectable()
export class TripDataService {

  constructor(
    private http: Http,
    @Inject(BROWSER_STORAGE) private storage: Storage
    ) { } // inject the Http service

  private apiBaseUrl = 'http://localhost:3000/api/'; // define the API base URL
  private tripsUrl = `${this.apiBaseUrl}trips/`; // define the trips URL

  // method to pass the JWT to the API
  private getAuthHeaders(): Headers {

    const headers: Headers = new Headers();

    headers.append('Authorization', `Bearer ${this.storage.getItem('travlr-token')}`);

    return headers;
  }

  // implement the method to add a trip to the API
  public addTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#addTrip');
    
    return this.http
      .post(this.tripsUrl, formData, {headers : this.getAuthHeaders()}) // template string
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
      .put(this.tripsUrl + formData.code, formData, {headers : this.getAuthHeaders()}) // template string
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  // implement the method to delete a trip from the API
  public deleteTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#deleteTrip');
    return this.http
      .delete(this.tripsUrl + tripCode, {headers : this.getAuthHeaders()}) // template string
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  // add a user into the user database
  public addUser(user: User): Promise<User> {
    console.log('Inside TripDataService#addUser');
    return this.http
      .post(this.apiBaseUrl + 'register', user) // template string
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  
  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response.json() as AuthResponse)
      .catch(this.handleError);
  }

}