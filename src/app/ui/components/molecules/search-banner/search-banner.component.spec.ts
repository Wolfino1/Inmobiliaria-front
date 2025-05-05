import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBannerComponent } from './search-banner.component';

describe('SearchBannerComponent', () => {
  let component: SearchBannerComponent;
  let fixture: ComponentFixture<SearchBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchBannerComponent]
    });
    fixture = TestBed.createComponent(SearchBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
