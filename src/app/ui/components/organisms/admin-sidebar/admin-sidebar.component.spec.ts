import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSidebarComponent } from './admin-sidebar.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { SIDEBAR_OPTIONS, SidebarOption } from 'src/app/shared/sidebar-options';

describe('AdminSidebarComponent', () => {
  let component: AdminSidebarComponent;
  let fixture: ComponentFixture<AdminSidebarComponent>;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      getUserRole: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [AdminSidebarComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSidebarComponent);
    component = fixture.componentInstance;
  });

  it('should set menuOptions for SELLER role', () => {
    (mockAuthService.getUserRole as jest.Mock).mockReturnValue('SELLER');
    component.ngOnInit();
    expect(component.menuOptions).toEqual(SIDEBAR_OPTIONS['SELLER']);
  });

  it('should set menuOptions for ADMIN role', () => {
    (mockAuthService.getUserRole as jest.Mock).mockReturnValue('ADMIN');
    component.ngOnInit();
    expect(component.menuOptions).toEqual(SIDEBAR_OPTIONS['ADMIN']);
  });

  it('should set menuOptions for BUYER role', () => {
    (mockAuthService.getUserRole as jest.Mock).mockReturnValue('BUYER');
    component.ngOnInit();
    expect(component.menuOptions).toEqual(SIDEBAR_OPTIONS['BUYER']);
  });

  it('should set empty menuOptions for unknown role', () => {
    (mockAuthService.getUserRole as jest.Mock).mockReturnValue('UNKNOWN');
    component.ngOnInit();
    expect(component.menuOptions).toEqual([] as SidebarOption[]);
  });
});