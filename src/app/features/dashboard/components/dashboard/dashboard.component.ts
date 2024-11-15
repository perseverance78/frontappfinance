import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { SettingsPanelComponent } from '../../../../shared/components/settings-panel/settings-panel.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    SettingsPanelComponent,
    SpinnerComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  title = 'demo1';

  showSidebar: boolean = true;
  showNavbar: boolean = true;
  showFooter: boolean = true;
  showSettings: boolean = true;
  isLoading?: boolean;

  constructor(private router: Router)  {
    
    // Removing Sidebar, Navbar, Footer for Documentation, Error and Auth pages
    router.events.forEach((event) => { 
      if(event instanceof NavigationStart) {
        if(event.url === '/rtl') {
          // translate.use('ar');
          document.querySelector('body')?.classList.add('rtl');
        } else {
          // translate.use('en');
          document.querySelector('body')?.classList.remove('rtl');
        }
        if((event['url'] == '/user-pages/login') || (event['url'] == '/user-pages/login-2') || (event['url'] == '/user-pages/register') || (event['url'] == '/user-pages/register-2') || (event['url'] == '/user-pages/lock-screen') || (event['url'] == '/error-pages/404') || (event['url'] == '/error-pages/500') ) {
          this.showSidebar = false;
          this.showNavbar = false;
          this.showFooter = false;
          this.showSettings = false;
          document.querySelector('.main-panel')?.classList.add('w-100');
          document.querySelector('.page-body-wrapper')?.classList.add('full-page-wrapper');
          if((event['url'] == '/user-pages/login-2') || (event['url'] == '/user-pages/register-2')) {
            document.querySelector('.content-wrapper')?.classList.add('auth', 'auth-img-bg', );
          } else if(event['url'] == '/user-pages/lock-screen') {
            document.querySelector('.content-wrapper')?.classList.add('auth', 'lock-full-bg');
          } else {
            document.querySelector('.content-wrapper')?.classList.remove('auth', 'auth-img-bg', );
            document.querySelector('.content-wrapper')?.classList.remove('auth', 'lock-full-bg');
          }
          if((event['url'] == '/error-pages/404') || (event['url'] == '/error-pages/500')) {
            document.querySelector('.content-wrapper')?.classList.add('p-0');
          }
        } else {
          this.showSidebar = true;
          this.showNavbar = true;
          this.showFooter = true;
          this.showSettings = true;
          document.querySelector('.main-panel')?.classList.remove('w-100');
          document.querySelector('.page-body-wrapper')?.classList.remove('full-page-wrapper');
          document.querySelector('.content-wrapper')?.classList.remove('auth', 'auth-img-bg');
          document.querySelector('.content-wrapper')?.classList.remove('p-0');
        }
      }
    });

    // Spinner for lazyload modules
    router.events.forEach((event) => { 
      if (event instanceof RouteConfigLoadStart) {
          this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
          this.isLoading = false;
      }
    });

  }

  ngOnInit() {
    // Scroll to top after route change
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
    });
  }
  

}
