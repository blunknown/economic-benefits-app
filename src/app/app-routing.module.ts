import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        data: {
          roles: ['ROLE_TITULAR', 'ROLE_RECEPTIONIST', 'ROLE_SECRETARY'],
        },
        canActivate: [RoleGuard],
        loadChildren: () =>
          import('./features/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'application',
        data: { roles: ['ROLE_TITULAR'] },
        canActivate: [RoleGuard],
        loadChildren: () =>
          import('./features/application/application.module').then(
            (m) => m.ApplicationModule
          ),
      },
      {
        path: 'applications',
        data: {
          roles: ['ROLE_TITULAR', 'ROLE_RECEPTIONIST', 'ROLE_SECRETARY'],
        },
        canActivate: [RoleGuard],
        loadChildren: () =>
          import('./features/applications/applications.module').then(
            (m) => m.ApplicationsModule
          ),
      },
      {
        path: 'profile',
        data: {
          roles: ['ROLE_TITULAR', 'ROLE_RECEPTIONIST', 'ROLE_SECRETARY'],
        },
        canActivate: [RoleGuard],
        loadChildren: () =>
          import('./features/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
