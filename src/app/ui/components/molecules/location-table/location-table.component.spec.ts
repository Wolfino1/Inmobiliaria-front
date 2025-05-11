import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationTableComponent } from './location-table.component';
import { LocationResponse } from 'src/app/core/models/location-response.model';

describe('LocationTableComponent', () => {
  let component: LocationTableComponent;
  let fixture: ComponentFixture<LocationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationTableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationTableComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('totalPages should return correct number of pages', () => {
    component.totalElements = 25;
    component.size = 10;
    expect(component.totalPages).toBe(3);
  });

  it('pages should return an array of page indices', () => {
    component.totalElements = 30;
    component.size = 10;
    expect(component.pages).toEqual([0, 1, 2]);
  });

  it('changePage should emit pageChange event with valid PageEvent', () => {
    component.totalElements = 20;
    component.size = 5;
    component.orderAsc = true;

    const emitSpy = jest.spyOn(component.pageChange, 'emit');
    component.changePage(2);

    expect(emitSpy).toHaveBeenCalledWith({ page: 2, size: 5, orderAsc: true });
    expect(component.page).toBe(2);
  });

  it('changePage should not emit event when newPage is out of bounds', () => {
    component.totalElements = 10;
    component.size = 10;

    const emitSpy = jest.spyOn(component.pageChange, 'emit');
    component.changePage(-1);
    component.changePage(1); // totalPages = 1, index 1 is out of range

    expect(emitSpy).not.toHaveBeenCalled();
    expect(component.page).toBe(0);
  });
});