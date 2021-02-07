import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getByJwt(): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/users/jwt`);
  }

  getByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/users/${username}`);
  }
}
