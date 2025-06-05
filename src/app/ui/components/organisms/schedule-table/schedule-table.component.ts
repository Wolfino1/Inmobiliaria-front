import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VisitsService, ScheduleVisitRequest } from 'src/app/core/services/visits.service';

export interface VisitEnriched {
  id: number;
  houseName: string;
  locationName: string;
  startDateTime: string;
  endDateTime: string;
}

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.scss']
})
export class ScheduleTableComponent {
  @Input() visits: VisitEnriched[] = [];
  @Input() isBuyer = false;
  @Output() schedule = new EventEmitter<number>();

  loadingByVisit: { [visitId: number]: boolean } = {};
  errorByVisit: { [visitId: number]: string } = {};

  constructor(private visitsService: VisitsService) {}

  onScheduleClick(visitId: number) {
    this.errorByVisit[visitId] = '';
    this.loadingByVisit[visitId] = true;

    const payload: ScheduleVisitRequest = { visitId };

    this.visitsService.scheduleVisit(payload).subscribe({
      next: () => {
        this.loadingByVisit[visitId] = false;
        this.schedule.emit(visitId);
      },
      error: (err) => {
        this.loadingByVisit[visitId] = false;
        const serverMsg = err.error?.message || 'Unable to schedule';
        this.errorByVisit[visitId] = serverMsg;
      }
    });
  }

  isLoading(visitId: number): boolean {
    return !!this.loadingByVisit[visitId];
  }

  getError(visitId: number): string {
    return this.errorByVisit[visitId] || '';
  }
}