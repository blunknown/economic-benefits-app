import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Application } from '../models/application';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor(private httpClient: HttpClient) {}

  create(application: Application): Observable<Application> {
    return this.httpClient.post<Application>(
      `${environment.apiUrl}/applications`,
      application
    );
  }

  getAll(): Observable<Application[]> {
    return this.httpClient.get<Application[]>(
      `${environment.apiUrl}/applications`
    );
  }

  getByUserId(userId: number): Observable<Application[]> {
    return this.httpClient.get<Application[]>(
      `${environment.apiUrl}/applications/users/${userId}`
    );
  }

  getByStatus(status: String): Observable<Application[]> {
    return this.httpClient.get<Application[]>(
      `${environment.apiUrl}/applications/${status}`
    );
  }

  update(id: number, application: Application): Observable<Application> {
    return this.httpClient.put<Application>(
      `${environment.apiUrl}/applications/${id}`,
      application
    );
  }
}
