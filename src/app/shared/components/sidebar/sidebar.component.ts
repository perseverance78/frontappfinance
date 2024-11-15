import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarService, SidebarItem } from '../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, NgbCollapseModule, RouterLink],
  providers: [SidebarService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  sidebarItems: SidebarItem[] = [];
  userName : string | null = null;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {

    this.sidebarItems = this.sidebarService.getSidebarItems();
    const body = document.querySelector('body');

    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function() {
        if (body?.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if (body?.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
    this.userName = localStorage.getItem('name_user');
  
  }

  toggleItem(item: SidebarItem): void {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }

}
