import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopNavbarComponent } from './top-navbar.component';

describe('TopNavbarComponent', () => {
  let component: TopNavbarComponent;
  let fixture: ComponentFixture<TopNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopNavbarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TopNavbarComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });
});
