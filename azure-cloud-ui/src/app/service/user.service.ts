import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:44351/User';

  constructor(private http: HttpClient) { }

  getTenantUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tenant-users`);
  }

  getTenantGroups(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tenant-groups`);
  }

  exchangeMicrosoftToken(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/exchange-microsoft`, request);
  }
}