import { Component, OnInit, Input } from '@angular/core';
import { Trip } from '../models/trip';
import { Router } from "@angular/router";
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

  @Input('trip') trip: any;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  private editTrip(trip: Trip): void {
    console.log('Inside TripCardComponent#editTrip');
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['edit-trip']);
  }

  // implement delete trip
  private deleteTrip(trip: Trip): void {
    console.log('Inside TripCardComponent#deleteTrip');
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['delete-trip']);
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}
