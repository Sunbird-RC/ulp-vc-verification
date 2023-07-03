import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { of as observableOf, throwError as observableThrowError, Observable, Subscriber } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string;
  authenticated: Boolean

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
   }

  login() {
    const data = {
      "username": "suraj123",
      "password": "1234"
    }

    this.http.post(`${this.baseUrl}/auth/login`, data).subscribe((response) => {
      // Handle the response
      console.log("login response", response);
    }, (error) => {
      // Handle any errors
      console.error("login error", error);
    });
  }

  sendOtp(mobile) {

    const data = {
      "mobile": mobile,
      "reason": "login"
    }

    return this.http.post(`${this.baseUrl}/auth/otp-send`, data).pipe(
      map((data: any) => {
        if (data.responseCode && data.responseCode !== 'OK') {
          return observableThrowError(data);
        }
        return data;
      }));

  }

  verifyOtp(mobile, otp, hash) {

    const data = {
      "mobile": mobile,
      "reason": "login",
      "otp": otp,
      "hash": hash
    }

    return this.http.post(`${this.baseUrl}/auth/otp-verify`, data).pipe(
      map((data: any) => {
        if (data.responseCode && data.responseCode !== 'OK') {
          return observableThrowError(data);
        }
        return data;
      }));

  }

  getAllUsers() {

   return this.http.get(`${this.baseUrl}/users/findAll`).pipe(
    map((data: any) => {
      if (data.responseCode && data.responseCode !== 'OK') {
        return observableThrowError(data);
      }
      return data;
    }));
  }

  isAuthenticated() {
    return this.authenticated;
  }

  setAuthenticated(authenticated) {
    this.authenticated = authenticated
  }

}
