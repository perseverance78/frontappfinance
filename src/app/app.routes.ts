import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/components/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) // Cargar el módulo de autenticación de forma perezosa
  },
  {
    path: 'dashboard',
    // component: DashboardComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule )
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }, // Redirigir a login si no se especifica ninguna ruta
  { path: '**', redirectTo: '/auth/login' } // Redirigir a login para rutas no encontradas
];

