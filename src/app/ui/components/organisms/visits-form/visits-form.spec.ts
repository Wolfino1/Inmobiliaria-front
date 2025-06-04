import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { VisitsFormComponent, PendingVisit } from './visits-form.component';
import { VisitsService } from 'src/app/core/services/visits.service';
import { SaveVisitRequest } from 'src/app/core/models/visits.model';

const visitsServiceMock = {
  saveVisit: jest.fn()
};

describe('VisitsFormComponent', () => {
  let component: VisitsFormComponent;
  let fixture: ComponentFixture<VisitsFormComponent>;
  let visitsService: VisitsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [VisitsFormComponent],
      providers: [
        { provide: VisitsService, useValue: visitsServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitsFormComponent);
    component = fixture.componentInstance;
    visitsService = TestBed.inject(VisitsService);
    component.houseId = 1;
    fixture.detectChanges();
    jest.clearAllMocks();
  });

  it('inicializa formulario y límites de fecha', () => {
    expect(component.visitsForm).toBeTruthy();
    expect(component.minDate).toBeDefined();
    expect(component.maxDate).toBeDefined();
  });

  it('timeRangeValidator marca error si startTime >= endTime', () => {
    const form = component.visitsForm;
    form.get('date')!.setValue('2025-06-10');
    form.get('startTime')!.setValue('10:00');
    form.get('endTime')!.setValue('10:00');
    form.updateValueAndValidity();
    expect(form.get('endTime')!.hasError('rangeInvalid')).toBe(true);
  });

  it('timeRangeValidator no marca error si endTime > startTime', () => {
    const form = component.visitsForm;
    form.get('date')!.setValue('2025-06-10');
    form.get('startTime')!.setValue('09:00');
    form.get('endTime')!.setValue('10:00');
    form.updateValueAndValidity();
    expect(form.get('endTime')!.hasError('rangeInvalid')).toBe(false);
  });

  it('addPendingVisit no agrega si formulario inválido', () => {
    component.addPendingVisit();
    expect(component.pendingVisits.length).toBe(0);
  });

  it('addPendingVisit agrega y resetea formulario', () => {
    component.visitsForm.setValue({
      date: '2025-07-01',
      startTime: '08:00',
      endTime: '09:00'
    });
    component.addPendingVisit();
    expect(component.pendingVisits.length).toBe(1);
    const pv: PendingVisit = component.pendingVisits[0];
    expect(pv.startDateTime).toBe('2025-07-01T08:00:00');
    expect(pv.endDateTime).toBe('2025-07-01T09:00:00');
    expect(component.visitsForm.value.date).toBeNull();
  });

  it('removePending elimina el pendiente indicado', () => {
    component.pendingVisits = [
      { startDateTime: '2025-07-01T08:00:00', endDateTime: '2025-07-01T09:00:00' },
      { startDateTime: '2025-07-02T10:00:00', endDateTime: '2025-07-02T11:00:00' }
    ];
    component.removePending(0);
    expect(component.pendingVisits.length).toBe(1);
    expect(component.pendingVisits[0].startDateTime).toBe('2025-07-02T10:00:00');
  });

  describe('saveAllVisits', () => {
    beforeEach(() => {
      component.pendingVisits = [];
      component.errorMessage = null;
      component.successMessage = null;
    });

    it('no llama a saveVisit si pendingVisits está vacío', () => {
      component.saveAllVisits();
      expect(visitsService.saveVisit).not.toHaveBeenCalled();
      expect(component.successMessage).toBeNull();
      expect(component.errorMessage).toBeNull();
    });

    it('llama a saveVisit por cada pendiente y emite onSaved en éxito', (done) => {
      component.pendingVisits = [
        { startDateTime: '2025-08-01T08:00:00', endDateTime: '2025-08-01T09:00:00' },
        { startDateTime: '2025-08-02T10:00:00', endDateTime: '2025-08-02T11:00:00' }
      ];
      (visitsServiceMock.saveVisit as jest.Mock)
        .mockReturnValueOnce(of({} as any))
        .mockReturnValueOnce(of({} as any));

      const savedSpy = jest.spyOn(component.onSaved, 'emit');

      component.saveAllVisits();

      setTimeout(() => {
        expect(visitsService.saveVisit).toHaveBeenCalledTimes(2);
        expect(component.pendingVisits.length).toBe(0);
        expect(component.successMessage).toBe('Visitas creadas exitosamente 🎉');
        expect(component.errorMessage).toBeNull();
        expect(savedSpy).toHaveBeenCalled();
        done();
      }, 0);
    });

    it('si saveVisit falla, setea errorMessage y no borra pendientes', (done) => {
      component.pendingVisits = [
        { startDateTime: '2025-08-03T08:00:00', endDateTime: '2025-08-03T09:00:00' }
      ];
      (visitsServiceMock.saveVisit as jest.Mock).mockReturnValueOnce(throwError(() => new Error('Error')));

      component.saveAllVisits();

      setTimeout(() => {
        expect(component.successMessage).toBeNull();
        expect(component.errorMessage).toBe('No se pudo crear las visitas. Intenta de nuevo.');
        expect(component.pendingVisits.length).toBe(1);
        done();
      }, 0);
    });
  });
});

