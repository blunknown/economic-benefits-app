import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../models/auth-request';
import { AuthResponse } from '../models/auth-response';
import { StorageService } from './storage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${environment.apiUrl}/auth/sign-in`, authRequest)
      .pipe(
        tap((authResponse) => {
          this.storageService.saveJwt(authResponse.jwt);
          this.router.navigate(['/home']);
        })
      );
  }

  logout(): void {
    this.storageService.removeJwt();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.storageService.getJwt();
  }
}
