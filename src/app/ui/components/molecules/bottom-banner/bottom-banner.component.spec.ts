import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BottomBannerComponent } from './bottom-banner.component';

describe('BottomBannerComponent', () => {
  let component: BottomBannerComponent;
  let fixture: ComponentFixture<BottomBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BottomBannerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BottomBannerComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });
});
