import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/core/services/location.service';
import { Department } from 'src/app/core/models/department.model';
import { City } from 'src/app/core/models/city.model';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {
  @Output() created = new EventEmitter<any>();
  form!: FormGroup;
  departments: Department[] = [];
  cities: City[] = [];
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      departmentId: [null, Validators.required],
      cityId: [null, Validators.required]
    });

    this.locationService.getDepartments().subscribe({
      next: depts => this.departments = depts,
      error: err => console.error('Error loading departments', err)
    });

    this.form.get('departmentId')!
      .valueChanges
      .subscribe((deptId: number) => {
        this.cities = [];
        this.form.get('cityId')!.reset();
        if (deptId != null) {
          this.locationService.getCitiesByDepartment(deptId).subscribe({
            next: cits => this.cities = cits,
            error: err => console.error('Error loading cities', err)
          });
        }
      });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, cityId } = this.form.value;
    const payload = { name, idCity: cityId };

    this.locationService.createLocation(payload).subscribe({
      next: location => {
        this.errorMessage = '';
        this.successMessage = 'Ubicación creada con éxito';
        this.form.reset();
        this.cities = [];
        this.created.emit(location);
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: err => {
        if (err.status === 0) {
          this.errorMessage = 'No se pudo conectar al servidor. Revisa tu conexión.';
        } else if (err.status >= 500) {
          this.errorMessage = 'Error en el servidor. Intenta de nuevo más tarde.';
        } else {
          this.errorMessage = err.error?.message || 'Ocurrió un error al crear la ubicación.';
        }
        this.successMessage = '';
      }
    });
  }
}