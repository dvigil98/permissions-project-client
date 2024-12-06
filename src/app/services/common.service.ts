import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Response } from '../core/utils/response';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private baseUrl: string = environment.API_URL;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getRoles(): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/common/roles`, { headers: this.getHeaders() });
  }

  getModules(): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/common/modules`, { headers: this.getHeaders() });
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
