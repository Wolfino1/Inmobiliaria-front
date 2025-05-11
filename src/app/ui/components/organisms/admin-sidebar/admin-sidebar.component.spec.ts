import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSidebarComponent } from './admin-sidebar.component';

describe('AdminSidebarComponent', () => {
  let component: AdminSidebarComponent;
  let fixture: ComponentFixture<AdminSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSidebarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSidebarComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });
});
