import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminTopbarComponent } from './admin-topbar.component';

describe('AdminTopbarComponent', () => {
  let component: AdminTopbarComponent;
  let fixture: ComponentFixture<AdminTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTopbarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTopbarComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener valores por defecto en los inputs', () => {
    expect(component.userName).toBe('Admin');
    expect(component.userAvatarUrl).toBe('/assets/user-avatar.jpg');
  });

  it('debería aceptar valores personalizados en los inputs', () => {
    component.userName = 'Laura';
    component.userAvatarUrl = '/assets/laura.jpg';
    fixture.detectChanges();

    expect(component.userName).toBe('Laura');
    expect(component.userAvatarUrl).toBe('/assets/laura.jpg');
  });
});
