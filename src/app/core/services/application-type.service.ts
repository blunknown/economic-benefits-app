import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicationType } from '../models/application-type';

@Injectable({
  providedIn: 'root',
})
export class ApplicationTypeService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ApplicationType[]> {
    return this.httpClient.get<ApplicationType[]>(
      `${environment.apiUrl}/application-types`
    );
  }
}
