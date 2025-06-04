// src/app/ui/pages/schedule-visits/schedule-visits.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { VisitsService, VisitFilteredResponse } from 'src/app/core/services/visits.service';
import { LocationService }                      from 'src/app/core/services/location.service';
import { HouseService }                         from 'src/app/core/services/house.service';
import { AuthService }                          from 'src/app/core/services/auth.service';

import { LocationResponse } from 'src/app/core/models/location-response.model';
import { HouseResponse }    from 'src/app/core/models/house-response.model';

export interface VisitEnriched {
  id: number;
  houseName: string;
  locationName: string;
  startDateTime: string;
  endDateTime: string;
}

@Component({
  selector: 'app-schedule-visits',
  templateUrl: './schedule-visits.component.html',
  styleUrls: ['./schedule-visits.component.scss']
})
export class ScheduleVisitsComponent implements OnInit {
  filterForm!: FormGroup;

  locations: LocationResponse[] = [];
  locationMap = new Map<number,string>();

  houseMap    = new Map<number,string>();

  visitsEnriched: VisitEnriched[] = [];
  loadingTable  = false;
  errorTable: string | null = null;

  currentPage = 0;
  pageSize    = 10;
  totalPages  = 1;

  isBuyer          = false;
  loadingSchedule  = false;

  constructor(
    private fb: FormBuilder,
    private visitsService: VisitsService,
    private locationService: LocationService,
    private houseService: HouseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isBuyer = this.authService.getUserRole() === 'BUYER';

    this.filterForm = this.fb.group({
      startFrom: [''],
      startTo:   [''],
      endFrom:   [''],
      endTo:     [''],
      location:  ['']
    });

    // 1) Traer ubicaciones primero y llenar el mapa
    this.locationService.getAllLocations(0, 1000, true).subscribe({
      next: paged => {
        this.locations = paged.content;
        paged.content.forEach(loc => {
          // Asegúrate de usar 'loc.name' si ese es el campo que trae tu backend
          this.locationMap.set(loc.id, loc.name);
        });

        // 2) Sólo cuando locationMap ya esté lleno, cargamos las visitas
        this.loadVisits();
      },
      error: () => {
        // Si algo falla al cargar ubicaciones, igual intento cargar visitas  
        this.loadVisits();
      }
    });
  }

  private loadVisits(): void {
    this.loadingTable = true;
    this.errorTable    = null;

    const f = this.filterForm.value;
    const startFrom  = f.startFrom ? new Date(f.startFrom).toISOString() : undefined;
    const startTo    = f.startTo   ? new Date(f.startTo).toISOString()   : undefined;
    const endFrom    = f.endFrom   ? new Date(f.endFrom).toISOString()   : undefined;
    const endTo      = f.endTo     ? new Date(f.endTo).toISOString()     : undefined;
    const locationId = f.location ? +f.location : undefined;

    this.visitsService
      .getFilteredVisits(
        this.currentPage,
        this.pageSize,
        'startDateTime',
        false,
        startFrom,
        startTo,
        endFrom,
        endTo,
        locationId
      )
      .subscribe({
        next: async paged => {
          this.totalPages = paged.totalPages;

          // 3) Obtener todos los houseId únicos y llenar houseMap
          const uniqueHouseIds = Array.from(new Set(paged.content.map(v => v.houseId)));
          const promises = uniqueHouseIds.map(id =>
    this.houseService.getHouseById(id).toPromise()
    .then(h => {
          console.log('House fetched:', h);
      if (h && h.id != null && h.name) {
        this.houseMap.set(h.id, h.name);
      } else {
        this.houseMap.set(id, 'Casa desconocida');
      }
    })
    .catch(() => {
      this.houseMap.set(id, 'Casa desconocida');
    })
);
await Promise.all(promises);
          // 4) Enriquecer cada visita con houseName y locationName
          this.visitsEnriched = paged.content.map(v => ({
            id:            v.id,
            houseName:     this.houseMap.get(v.houseId) || 'Casa desconocida',
            locationName:  this.locationMap.get(v.locationId) || 'Ubicación desconocida',
            startDateTime: v.startDateTime,
            endDateTime:   v.endDateTime
          }));

          this.loadingTable = false;
        },
        error: () => {
          this.errorTable   = 'No se pudieron cargar los horarios.';
          this.loadingTable = false;
        }
      });
  }

  onSearch(): void {
    this.currentPage = 0;
    this.loadVisits();
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadVisits();
    }
  }

  nextPage(): void {
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage++;
      this.loadVisits();
    }
  }

  changeToPage(pageIndex: number): void {
    this.currentPage = pageIndex;
    this.loadVisits();
  }

  onSchedule(visitId: number): void {
    this.loadingSchedule = true;
    this.visitsService.scheduleVisit({ visitId }).subscribe({
      next: () => {
        alert('Visita agendada con éxito.');
        this.loadingSchedule = false;
        this.loadVisits();
      },
      error: () => {
        alert('No se pudo agendar la visita. Intenta de nuevo.');
        this.loadingSchedule = false;
      }
    });
  }
}