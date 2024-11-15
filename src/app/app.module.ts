import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { AuthModule } from './features/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './features/dashboard/dashboard.module';


@NgModule({
  imports: [
    BrowserModule, 
    RouterModule.forRoot(appRoutes),
    AuthModule,
    SharedModule,
    DashboardModule
  
   

  ],
  bootstrap: [] 
})
export class AppModule { }
