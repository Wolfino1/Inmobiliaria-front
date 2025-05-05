import { Component } from '@angular/core';
import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent {
  userName = 'Admin';
  userAvatarUrl = '/assets/user-avatar.jpg';

  constructor(private locationService: LocationService) {}
}
