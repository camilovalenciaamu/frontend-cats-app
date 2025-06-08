import { Routes } from '@angular/router';
import { AuthGuard } from './presentation/guards/auth.guard';
import { GuestGuard } from './presentation/guards/guest.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./presentation/pages/home/home.component').then(
        (m) => m.HomeComponent
      ),
    canActivate: [GuestGuard],
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./presentation/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
    canActivate: [GuestGuard],
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./presentation/pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    canActivate: [GuestGuard],
  },

  {
    path: 'profile',
    loadComponent: () =>
      import('./presentation/pages/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: 'home' },
];
