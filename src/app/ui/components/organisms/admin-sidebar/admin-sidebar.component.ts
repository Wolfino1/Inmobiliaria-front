import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { SIDEBAR_OPTIONS, SidebarOption } from 'src/app/shared/sidebar-options';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  menuOptions: SidebarOption[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const role = this.authService.getUserRole() ?? '';
    this.menuOptions = SIDEBAR_OPTIONS[role] || [];
  }
}
