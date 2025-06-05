import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators }            from '@angular/forms';
import { forkJoin }                                      from 'rxjs';
import { VisitsService }                                 from 'src/app/core/services/visits.service';
import { SaveVisitRequest, VisitsResponse }               from 'src/app/core/models/visits.model';

export interface PendingVisit {
  startDateTime: string;
  endDateTime:   string;
}

@Component({
  selector: 'app-visits-form',
  templateUrl: './visits-form.component.html',
  styleUrls: ['./visits-form.component.scss']
})
export class VisitsFormComponent implements OnInit {
  @Input() houseId!: number;
  @Output() onSaved = new EventEmitter<void>();

  visitsForm!: FormGroup;
  pendingVisits: Array<{ startDateTime: string; endDateTime: string }> = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;
  minDate: string = '';
  maxDate: string = '';

  constructor(
    private fb: FormBuilder,
    private visitsService: VisitsService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.setDateLimits();
  }

  buildForm(): void {
    this.visitsForm = this.fb.group({
      date:      ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime:   ['', [Validators.required]]
    }, {
      validator: this.timeRangeValidator('startTime', 'endTime')
    });
  }

  setDateLimits(): void {
    const today = new Date();
    const inThreeWeeks = new Date();
    inThreeWeeks.setDate(today.getDate() + 21);

    this.minDate = today.toISOString().split('T')[0];
    this.maxDate = inThreeWeeks.toISOString().split('T')[0];
  }

  timeRangeValidator(startKey: string, endKey: string) {
    return (group: FormGroup) => {
      const start = group.controls[startKey];
      const end   = group.controls[endKey];

      if (start.value && end.value && start.value >= end.value) {
        end.setErrors({ rangeInvalid: true });
      } else {
        if (end.hasError('rangeInvalid')) {
          end.setErrors(null);
          end.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        }
      }
      return null;
    };
  }

  addPendingVisit(): void {
    if (this.visitsForm.invalid) return;

    const date  = this.visitsForm.value.date;
    const start = this.visitsForm.value.startTime;
    const end   = this.visitsForm.value.endTime;

    const startDateTime = `${date}T${start}:00`;
    const endDateTime   = `${date}T${end}:00`;

    this.pendingVisits.push({ startDateTime, endDateTime });
    this.visitsForm.reset();
  }

  saveAllVisits(): void {
    if (this.pendingVisits.length === 0) return;

    this.errorMessage = null;
    this.successMessage = null;

    const requests = this.pendingVisits.map(v => {
      const dto: SaveVisitRequest = {
        houseId: this.houseId,
        startDateTime: v.startDateTime,
        endDateTime:   v.endDateTime
      };
      return this.visitsService.saveVisit(dto);
    });

forkJoin(requests).subscribe({
  next: () => {
    this.pendingVisits = [];
    this.successMessage = 'Visitas creadas exitosamente 🎉';
    this.onSaved.emit();
  },
  error: (err) => {
    console.error('Error guardando visitas:', err);
    this.errorMessage = 'No se pudo crear las visitas. Intenta de nuevo.';
  }
});
  }

  removePending(index: number): void {
    this.pendingVisits.splice(index, 1);
  }
}
