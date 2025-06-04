// categories-table.component.spec.ts
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesTableComponent, PageEvent } from './categories-table.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CategoriesTableComponent', () => {
  let component: CategoriesTableComponent;
  let fixture: ComponentFixture<CategoriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesTableComponent],
      imports: [CommonModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesTableComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default inputs and getters', () => {
    it('should default totalPages to 1 when totalElements is 0', () => {
      component.totalElements = 0;
      component.size = 10;
      expect(component.totalPages).toBe(1);
    });

    it('should compute totalPages correctly when totalElements > 0', () => {
      component.totalElements = 25;
      component.size = 10;
      expect(component.totalPages).toBe(3);
    });

    it('should build pages array correctly', () => {
      component.totalElements = 25;
      component.size = 10;
      expect(component.pages).toEqual([0, 1, 2]);
    });

    it('should return [0] in pages when totalElements < size but > 0', () => {
      component.totalElements = 5;
      component.size = 10;
      expect(component.pages).toEqual([0]);
    });
  });

  describe('changePage()', () => {
    it('should emit a PageEvent when newPage is valid', () => {
      component.size = 5;
      component.totalElements = 20;
      component.page = 0;
      component.orderAsc = true;

      let emitted: PageEvent | null = null;
      component.pageChange.subscribe((pe: PageEvent) => (emitted = pe));

      component.changePage(2);
      expect(emitted).toEqual({ page: 2, size: 5, orderAsc: true });
    });

    it('should not emit when newPage is negative', () => {
      component.size = 5;
      component.totalElements = 20;
      component.page = 1;
      component.orderAsc = false;

      let calledCount = 0;
      component.pageChange.subscribe(() => calledCount++);

      component.changePage(-1);
      expect(calledCount).toBe(0);
    });

    it('should not emit when newPage >= totalPages', () => {
      component.size = 5;
      component.totalElements = 20;
      component.page = 0;
      component.orderAsc = false;

      let called = false;
      component.pageChange.subscribe(() => (called = true));

      component.changePage(4);
      expect(called).toBe(false);
    });
  });

  describe('nextPage() and prevPage()', () => {
    beforeEach(() => {
      component.size = 5;
      component.totalElements = 20;
      component.page = 1;
      component.orderAsc = false;
    });

    it('nextPage() should emit event with page + 1 when valid', () => {
      let emitted: PageEvent | null = null;
      component.pageChange.subscribe((pe) => (emitted = pe));
      component.nextPage();
      expect(emitted).toEqual({ page: 2, size: 5, orderAsc: false });
    });

    it('nextPage() should not emit if already at last page', () => {
      component.page = 3;
      let called = false;
      component.pageChange.subscribe(() => (called = true));
      component.nextPage();
      expect(called).toBe(false);
    });

    it('prevPage() should emit event with page - 1 when valid', () => {
      let emitted: PageEvent | null = null;
      component.pageChange.subscribe((pe) => (emitted = pe));
      component.prevPage();
      expect(emitted).toEqual({ page: 0, size: 5, orderAsc: false });
    });

    it('prevPage() should not emit if already at first page', () => {
      component.page = 0;
      let called = false;
      component.pageChange.subscribe(() => (called = true));
      component.prevPage();
      expect(called).toBe(false);
    });
  });

  describe('template rendering', () => {
    

    it('should display "No hay categorías para mostrar." when categories input is empty', () => {
      component.categories = [];
      component.totalElements = 0;
      fixture.detectChanges();

      const noDataDiv = fixture.debugElement.query(By.css('.no-data'));
      expect(noDataDiv).toBeTruthy();
      expect(noDataDiv.nativeElement.textContent).toContain('No hay categorías para mostrar.');
    });

    it('should not render pagination if totalPages <= 1', () => {
      component.categories = [{ id: 1, name: 'X', description: 'Y' }] as any;
      component.totalElements = 5;
      component.page = 0;
      component.size = 10;
      fixture.detectChanges();

      const pagination = fixture.debugElement.query(By.css('.pagination'));
      expect(pagination).toBeNull();
    });

  });
});
