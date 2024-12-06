import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Response } from '../core/utils/response';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.API_URL;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getUsers(): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/users`, { headers: this.getHeaders() });
  }

  saveUser(user: User): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/users`, user, { headers: this.getHeaders() });
  }

  getUser(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/users/${id}`, { headers: this.getHeaders() });
  }

  updateUser(user: User, id: number): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/users/${id}`, user, { headers: this.getHeaders() });
  }

  deleteUser(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/users/${id}`, { headers: this.getHeaders() });
  }

  searchUsers(critery: string, value: string): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/users/${critery}/${value}/search`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {

    let user = JSON.parse(this.authService.getUser());

    return new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.access_token}`,
    });
  }
}
