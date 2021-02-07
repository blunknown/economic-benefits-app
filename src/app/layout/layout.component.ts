import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  user$: Observable<User>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user$ = this.userService.getByJwt();
  }

  logout(): void {
    this.authService.logout();
  }

  getAvatarPath(role: string): string {
    switch (role) {
      case 'ROLE_TITULAR':
        return 'assets/img/titular.png';
      case 'ROLE_RECEPTIONIST':
        return 'assets/img/receptionist.png';
      default:
        return 'assets/img/secretary.png';
    }
  }
}
