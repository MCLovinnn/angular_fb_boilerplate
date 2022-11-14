import { Injectable } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import * as moment from 'moment';


interface Message {
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  customer: any[];
  consultants: any[];
  isAuthenticated = false;
  message: string;
  expiresAt: any;
  userProfile: any;
  accessToken: string;
  authenticated: boolean;
  profileJson: any;

  constructor(
    public auth: AuthService,
    private route: Router,
    private http: HttpClient
    ) {

    this.auth.isAuthenticated$.subscribe((success: boolean) => {
      this.isAuthenticated = success;
      if (success) {
        this.getAccessToken();
      }
    });

    if(!this.isAuthenticated) {
      route.navigate(['']);
    }
  }


  callApi(type: string) {
    return this.http
      .get(`${environment.dev.apiUrl}`, {
        params: {type}
      });
  }

  getCustomer() {
    return this.customer;
  }

  login() {
    this.auth.loginWithPopup();
  }

  get isLoggedIn(): boolean {
    // Check if current date is before token
    // expiration and user is signed in locally
    return (Date.now() < (this.expiresAt.add(36000, 's'))) && this.authenticated;
  }


  getUserInfo() {
    // Use access token to retrieve user's profile and set session
    this.auth.user$.subscribe(
      (profile) => {
        this.profileJson = JSON.stringify(profile, null, 2);
        this._setSession(profile);
        console.log(profile);

        console.log(this.profileJson);
      },
    );
  }

  getAccessToken() {
    this.auth.getAccessTokenSilently().subscribe(authResult => {
      if (authResult) {
        this.accessToken = authResult;
        this.getUserInfo();
      }
    });
  }

  private _setSession(profile) {
    // Save authentication data and update login status subject

    this.userProfile = profile;
    this.authenticated = true;
    this.expiresAt = moment(profile.updated_at);
    console.log(this.isLoggedIn);
    console.log(this.expiresAt);

  }
}
