import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpOptions } from '../interfaces/httpOptions.interface';
import * as config from '../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl: string
  constructor(private readonly httpClient: HttpClient) {
    this.baseUrl = config.bffUrl
  }

  verify(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/v1/sso/student/credentials/verify/${id}`)
  }

  private getHeader(headers?: HttpOptions['headers']): HttpOptions['headers'] {


    let token = localStorage.getItem('token');

    if (token) {
      // alert(this.keycloak.isLoggedIn);
      let defaultHeaders = {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      };
      return defaultHeaders;
    } else {
      let defaultHeaders = {
        Accept: 'application/json'
      };
      return defaultHeaders;
    }
  }

  get(requestParam): Observable<any> {
    const httpOptions: HttpOptions = {
      headers: requestParam.header ? requestParam.header : this.getHeader(),
      params: requestParam.param
    };

    return this.httpClient.get(requestParam.url, httpOptions);
  }

  post(requestParam): Observable<any> {
    const httpOptions: HttpOptions = {
      headers: requestParam.header ? this.getHeader(requestParam.header) : this.getHeader(),
      params: requestParam.param
    };

    return this.httpClient.post(requestParam.url, requestParam.data, httpOptions).pipe(
      map((data: any) => {
        if (data.responseCode && data.responseCode !== 'OK') {
          return throwError(data);
        }
        return data;
      }));
  }
}
