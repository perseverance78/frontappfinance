import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {

  public iconOnlyToggled = false;
  public sidebarToggled = false;

  
  constructor(
    config: NgbDropdownConfig, 
    private authService: AuthService, 
    private router: Router
  ) 
  {
    config.placement = 'bottom-right';
  }

  ngOnInit() {
  }

  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas')?.classList.toggle('active');
  }

  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector('body');
    if((!body?.classList.contains('sidebar-toggle-display')) && (!body?.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if(this.iconOnlyToggled) {
        body?.classList.add('sidebar-icon-only');
      } else {
        body?.classList.remove('sidebar-icon-only');
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if(this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }

  // toggle right sidebar
  toggleRightSidebar() {
    document.querySelector('#right-sidebar')?.classList.toggle('open');
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
