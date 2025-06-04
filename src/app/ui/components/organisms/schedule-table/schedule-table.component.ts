import { Component, Input, Output, EventEmitter } from '@angular/core';

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
  @Input() loadingSchedule = false;

  @Output() schedule = new EventEmitter<number>();

  onScheduleClick(visitId: number) {
    this.schedule.emit(visitId);
  }
}