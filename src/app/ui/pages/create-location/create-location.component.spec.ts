import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CreateLocationComponent } from './create-location.component';
import { LocationService } from 'src/app/core/services/location.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocationResponse } from 'src/app/core/models/location-response.model';

describe('CreateLocationComponent', () => {
  let component: CreateLocationComponent;
  let fixture: ComponentFixture<CreateLocationComponent>;
  let mockLocationService: Partial<LocationService>;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockLocationService = {
      getAllLocations: jest.fn()
    };

    mockAuthService = {
      getUserRole: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [CreateLocationComponent],
      providers: [
        { provide: LocationService, useValue: mockLocationService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateLocationComponent);
    component = fixture.componentInstance;
  });

  it('should set isAdmin to true when role is ADMIN', () => {
    (mockAuthService.getUserRole as jest.Mock).mockReturnValue('ADMIN');
    (mockLocationService.getAllLocations as jest.Mock).mockReturnValue(of({ content: [], totalElements: 0 }));

    component.ngOnInit();

    expect(component.isAdmin).toBe(true);
  });

  it('should set isAdmin to false for non-admin role', () => {
    (mockAuthService.getUserRole as jest.Mock).mockReturnValue('SELLER');
    (mockLocationService.getAllLocations as jest.Mock).mockReturnValue(of({ content: [], totalElements: 0 }));

    component.ngOnInit();

    expect(component.isAdmin).toBe(false);
  });

  it('should call getAllLocations on init and update locations and totalElements', () => {
    const dummyResponse: { content: LocationResponse[]; totalElements: number } = {
      content: [{ id: 1, name: 'Loc1' } as LocationResponse],
      totalElements: 5
    };
    (mockAuthService.getUserRole as jest.Mock).mockReturnValue('ADMIN');
    (mockLocationService.getAllLocations as jest.Mock).mockReturnValue(of(dummyResponse));

    component.ngOnInit();

    expect(mockLocationService.getAllLocations).toHaveBeenCalledWith(0, 10, true, '');
    expect(component.locations).toEqual(dummyResponse.content);
    expect(component.totalElements).toBe(dummyResponse.totalElements);
  });

});