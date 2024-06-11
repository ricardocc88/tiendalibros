import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url;

  constructor(private http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  login_admin(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'login_admin', data, { headers: headers });
  }

  getToken(){
    return localStorage.getItem('token');
    
  }

  public isAuthenticated(allowRoles:String[]):boolean{
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(<any>token);
    return true;
  }

}