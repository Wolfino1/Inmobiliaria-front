import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleTableComponent, VisitEnriched } from './schedule-table.component';
import { VisitsService, ScheduleVisitRequest } from 'src/app/core/services/visits.service';
import { of, throwError } from 'rxjs';

describe('ScheduleTableComponent', () => {
  let component: ScheduleTableComponent;
  let fixture: ComponentFixture<ScheduleTableComponent>;
  let mockVisitsService: Partial<VisitsService>;

  beforeEach(async () => {
    mockVisitsService = {
      scheduleVisit: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ScheduleTableComponent],
      providers: [
        { provide: VisitsService, useValue: mockVisitsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component y estado inicial esté vacío', () => {
    expect(component).toBeTruthy();
    expect(component.visits).toEqual([]);
    expect(component.isBuyer).toBe(false);
    expect(component.loadingByVisit).toEqual({});
    expect(component.errorByVisit).toEqual({});
  });

  it('isLoading debería devolver false si no hay carga para un visitId', () => {
    expect(component.isLoading(123)).toBe(false);
  });

  it('getError debería devolver cadena vacía si no hay error para un visitId', () => {
    expect(component.getError(456)).toBe('');
  });

  it('onScheduleClick: si el error no trae mensaje, se usa mensaje por defecto', () => {
    const visitId = 99;
    const fakeError2 = { error: {} };
    (mockVisitsService.scheduleVisit as jest.Mock).mockReturnValue(throwError(() => fakeError2));

    component.onScheduleClick(visitId);

    expect(component.loadingByVisit[visitId]).toBe(false);
    expect(component.getError(visitId)).toBe('Unable to schedule');
  });

  it('isLoading debe reflejar correctamente estados de loadingByVisit', () => {
    component.loadingByVisit[3] = true;
    expect(component.isLoading(3)).toBe(true);
    component.loadingByVisit[3] = false;
    expect(component.isLoading(3)).toBe(false);
  });

  it('getError debe devolver el mensaje de error almacenado', () => {
    component.errorByVisit[7] = 'Error específico';
    expect(component.getError(7)).toBe('Error específico');
  });
});
