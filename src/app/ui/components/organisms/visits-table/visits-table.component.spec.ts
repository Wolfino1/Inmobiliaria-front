import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { VisitsTableComponent } from './visits-table.component';
import { VisitsService, VisitResponse } from 'src/app/core/services/visits.service';

interface FakePagedResult<T> {
  content: T[];
  size?: number;
  totalElements?: number;
}

const visitsServiceMock = {
  getUpcomingVisitsByHouse: jest.fn()
};

describe('VisitsTableComponent', () => {
  let component: VisitsTableComponent;
  let fixture: ComponentFixture<VisitsTableComponent>;
  let visitsService: VisitsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitsTableComponent],
      providers: [
        { provide: VisitsService, useValue: visitsServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitsTableComponent);
    component = fixture.componentInstance;
    visitsService = TestBed.inject(VisitsService);

    component.houseId = 123;
    jest.clearAllMocks();
  });

  it('llama a loadUpcomingVisits en ngOnInit y muestra datos cuando el servicio responde', () => {
    const fakeVisits: VisitResponse[] = [
      {
        id: 1,
        startDateTime: '2025-06-06T16:00:00',
        endDateTime: '2025-06-06T17:00:00',
        houseId: 123,
      },
      {
        id: 2,
        startDateTime: '2025-06-07T10:00:00',
        endDateTime: '2025-06-07T11:00:00',
        houseId: 123,

      }
    ];
    const fakePaged: FakePagedResult<VisitResponse> = { content: fakeVisits };

    (visitsServiceMock.getUpcomingVisitsByHouse as jest.Mock).mockReturnValueOnce(of(fakePaged));

    fixture.detectChanges(); // dispara ngOnInit

    expect(visitsService.getUpcomingVisitsByHouse).toHaveBeenCalledWith(123);
    expect(component.visits).toEqual(fakeVisits);
    expect(component.loading).toBe(false);
    expect(component.errorMessage).toBeNull();
  });

  it('muestra loading=true mientras carga y errorMessage si el servicio falla', () => {
    (visitsServiceMock.getUpcomingVisitsByHouse as jest.Mock).mockReturnValueOnce(throwError(() => new Error('Error')));

    fixture.detectChanges(); // dispara ngOnInit

    expect(visitsService.getUpcomingVisitsByHouse).toHaveBeenCalledWith(123);
    expect(component.visits).toEqual([]);
    expect(component.loading).toBe(false);
    expect(component.errorMessage).toBe('No se pudieron cargar las visitas.');
  });
});
