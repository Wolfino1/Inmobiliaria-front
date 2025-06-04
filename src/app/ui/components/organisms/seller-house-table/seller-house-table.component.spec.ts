import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerHouseTableComponent } from './seller-house-table.component';

describe('SellerHouseTableComponent', () => {
  let component: SellerHouseTableComponent;
  let fixture: ComponentFixture<SellerHouseTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerHouseTableComponent]
    });
    fixture = TestBed.createComponent(SellerHouseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
