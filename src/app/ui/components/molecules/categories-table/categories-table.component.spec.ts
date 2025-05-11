import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesTableComponent, PageEvent } from './categories-table.component';

describe('CategoriesTableComponent', () => {
  let component: CategoriesTableComponent;
  let fixture: ComponentFixture<CategoriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesTableComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería calcular el total de páginas correctamente', () => {
    component.totalElements = 25;
    component.size = 10;
    expect(component.totalPages).toBe(3);
  });

  it('debería generar un array de páginas correctamente', () => {
    component.totalElements = 30;
    component.size = 10;
    expect(component.pages).toEqual([0, 1, 2]);
  });

  it('debería emitir evento al cambiar de página válida', () => {
    const emitSpy = jest.spyOn(component.pageChange, 'emit');
    component.totalElements = 50;
    component.size = 10;

    component.changePage(2);

    expect(component.page).toBe(2);
    expect(emitSpy).toHaveBeenCalledWith({
      page: 2,
      size: 10,
      orderAsc: false,
    });
  });

  it('no debería cambiar de página si newPage es inválido (negativo)', () => {
    const emitSpy = jest.spyOn(component.pageChange, 'emit');
    component.totalElements = 20;
    component.size = 10;

    component.changePage(-1);

    expect(component.page).toBe(0);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('no debería cambiar de página si newPage excede totalPages', () => {
    const emitSpy = jest.spyOn(component.pageChange, 'emit');
    component.totalElements = 20;
    component.size = 10;

    component.changePage(5); // totalPages sería 2

    expect(component.page).toBe(0);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('debería avanzar con nextPage()', () => {
    const spy = jest.spyOn(component, 'changePage');
    component.page = 1;
    component.totalElements = 30;
    component.size = 10;

    component.nextPage();
    expect(spy).toHaveBeenCalledWith(2);
  });

  it('debería retroceder con prevPage()', () => {
    const spy = jest.spyOn(component, 'changePage');
    component.page = 2;
    component.totalElements = 30;
    component.size = 10;

    component.prevPage();
    expect(spy).toHaveBeenCalledWith(1);
  });
});
