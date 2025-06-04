import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HouseService } from 'src/app/core/services/house.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { HouseRequest } from 'src/app/core/models/house-request.model';
import { LocationService } from 'src/app/core/services/location.service';
import { ADDRESS_ALREADY_EXISTS, ERROR_LOADING_CATEGORIES, ERROR_LOADING_LOCATIONS, GENERIC_ERROR_CREATING_HOUSE, LISTING_DATE_IS_IN_MORE_THAN_ONE_MONTH } from 'src/app/shared/errors/constant-error';
import { HOUSE_CREATED } from 'src/app/shared/errors/constant-success';

@Component({
  selector: 'app-create-house',
  templateUrl: './create-house.component.html',
  styleUrls: ['./create-house.component.scss']
})
export class CreateHouseComponent implements OnInit {
  form!: FormGroup;
  categories: { id: number; name: string }[] = [];
  locations:  { id: number; name: string }[] = [];
  errorMessage:   string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private houseService: HouseService,
    private categoryService: CategoryService,
    private locationService: LocationService  
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:                  ['', [Validators.required, Validators.maxLength(50)]],
      price:                 [null, [Validators.required, Validators.min(0)]],
      address:               ['', [Validators.required, Validators.maxLength(100)]],
      numberOfRooms:         [null, [Validators.required, Validators.min(0)]],
      numberOfBathrooms:     [null, [Validators.required, Validators.min(0)]],
      sellerId:              [null, [Validators.required, Validators.min(1)]],
      description:           ['', [Validators.required, Validators.maxLength(200)]],
      idCategory:            [null, Validators.required],
      idLocation:            [null, [Validators.required, Validators.min(1)]],
      publishActivationDate: [null, Validators.required]
    });

    this.categoryService.getAllCategories().subscribe({
      next: res => this.categories = res.content,
      error: err => console.error(ERROR_LOADING_CATEGORIES, err)
    });

    this.locationService.getAllLocations(0, 100, false).subscribe({
      next: res => this.locations = res.content.map(loc => ({ id: loc.id, name: loc.name })),
      error: err => console.error(ERROR_LOADING_LOCATIONS, err)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const request: HouseRequest = { ...this.form.value };

    this.houseService.createHouse(request).subscribe({
      next: () => {
        this.successMessage = HOUSE_CREATED;
        this.form.reset();
      },
      error: err => {
        const msg = err.error?.message;
        if (msg === ADDRESS_ALREADY_EXISTS) {
          this.form.get('address')?.setErrors({ addressExists: true });
        } else if (msg === LISTING_DATE_IS_IN_MORE_THAN_ONE_MONTH) {
          this.form.get('publishActivationDate')?.setErrors({ listingDateExceed: true });
        } else {
          this.errorMessage = GENERIC_ERROR_CREATING_HOUSE;
        }
      }
    });
  }
}

