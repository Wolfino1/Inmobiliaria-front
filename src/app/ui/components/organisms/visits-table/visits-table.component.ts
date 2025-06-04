import { Component, Input, OnInit } from '@angular/core';
import { VisitsService, VisitResponse } from 'src/app/core/services/visits.service';

@Component({
  selector: 'app-visits-table',
  templateUrl: './visits-table.component.html',
  styleUrls: ['./visits-table.component.scss']
})
export class VisitsTableComponent implements OnInit {
  @Input() houseId!: number;

  visits: VisitResponse[] = [];

  loading = false;
  errorMessage: string | null = null;

  constructor(private visitsService: VisitsService) {}

  ngOnInit(): void {
    this.loadUpcomingVisits();
  }

  private loadUpcomingVisits(): void {
    this.loading = true;
    this.errorMessage = null;

    this.visitsService.getUpcomingVisitsByHouse(this.houseId).subscribe({
      next: (paged) => {
        this.visits = paged.content;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando visitas', err);
        this.errorMessage = 'No se pudieron cargar las visitas.';
        this.loading = false;
      }
    });
  }
}

