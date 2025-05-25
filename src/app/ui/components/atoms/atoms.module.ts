import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchButtonComponent }   from './search-button/search-button.component';
import { CategorySelectComponent } from './category-select/category-select.component';
import { LocationInputComponent } from './location-input/location-input.component';
import { LoginInputComponent } from './login-input/login-input.component';
import { FormSelectComponent }    from './form-select/form-select.component';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';



@NgModule({
  declarations: [
    SearchButtonComponent,    
    CategorySelectComponent,
    LocationInputComponent,
    LoginInputComponent,
    FormSelectComponent,
    PrimaryButtonComponent
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
    PrimaryButtonComponent
  ]
})
export class AtomsModule {}
