import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-topbar',
  templateUrl: './admin-topbar.component.html',
  styleUrls: ['./admin-topbar.component.scss']
})
export class AdminTopbarComponent {
  @Input() userName: string = 'Admin';
  @Input() userAvatarUrl: string = '/assets/user-avatar.jpg';
}
