import { Component, OnInit } from '@angular/core';
import { LocationService }   from 'src/app/core/services/location.service';
import { LocationResponse }  from 'src/app/core/models/location-response.model';
import { AuthService }       from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent implements OnInit {
  isAdmin = false;
  userName      = '';
  userAvatarUrl  = '/assets/default-avatar.jpg';

  locations: LocationResponse[] = [];
  totalElements = 0;

  page     = 0;
  size     = 10;
  orderAsc = true;
  searchTerm = '';

  constructor(
    private locationService: LocationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.getUserRole() === 'ADMIN';
    this.loadLocations();
  }
  
  onSearch(term: string): void {
    this.searchTerm = term;
    this.page = 0;
    this.loadLocations();
  }

  onPageChange(event: { page: number; size: number; orderAsc: boolean }): void {
    this.page     = event.page;
    this.size     = event.size;
    this.orderAsc = event.orderAsc;
    this.loadLocations();
  }
  
  onLocationCreated(_: any): void {
    this.page = 0;
    this.loadLocations();
  }

  private loadLocations(): void {
    this.locationService
      .getAllLocations(this.page, this.size, this.orderAsc, this.searchTerm)
      .subscribe({
        next: res => {
          this.locations     = res.content;
          this.totalElements = res.totalElements;
        },
        error: err => console.error('Error loading locations', err)
      });
  }
}