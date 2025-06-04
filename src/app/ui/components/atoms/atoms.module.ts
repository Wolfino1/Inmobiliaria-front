import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchButtonComponent }   from './search-button/search-button.component';
import { CategorySelectComponent } from './category-select/category-select.component';
import { LocationInputComponent } from './location-input/location-input.component';
import { LoginInputComponent } from './login-input/login-input.component';
import { FormSelectComponent }    from './form-select/form-select.component';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { SelectFieldComponent } from './select-field/select-field.component';
import { DatePickerComponent } from './date-picker/date-picker.component';


@NgModule({
  declarations: [
    SearchButtonComponent,    
    CategorySelectComponent,
    LocationInputComponent,
    LoginInputComponent,
    FormSelectComponent,
    PrimaryButtonComponent,
    InputFieldComponent,
    SelectFieldComponent,
    DatePickerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule    
  ],
  exports: [
    SearchButtonComponent,
    CategorySelectComponent,
    LocationInputComponent,
    LoginInputComponent,
    FormSelectComponent,
    PrimaryButtonComponent,
    InputFieldComponent,
    SelectFieldComponent,
    DatePickerComponent
  ]
})
export class AtomsModule {}
