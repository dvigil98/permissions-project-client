import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../core/utils/response';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<Response> {

    const headersNoToken = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post<Response>(`${this.baseUrl}/login`, { email: email, password: password }, { headers: headersNoToken });
  }

  logout(token: string): Observable<Response> {

    const headersWithToken = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<Response>(`${this.baseUrl}/logout`, { headers: headersWithToken });
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    let user: any = localStorage.getItem('user');
    if (!user)
      throw 'no user found';
    return user;
  }

  deleteUser() {
    localStorage.clear();
  }

  isLoggedIn() {
    if (localStorage.getItem('user') != undefined)
      return true;
    return false;
  }
}
