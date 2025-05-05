import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchButtonComponent }   from './search-button/search-button.component';
import { CategorySelectComponent } from './category-select/category-select.component';
import { LocationInputComponent } from './location-input/location-input.component';



@NgModule({
  declarations: [
    SearchButtonComponent,    
    CategorySelectComponent,
    LocationInputComponent
  ],
  imports: [
    CommonModule,
    
  ],
  exports: [
    SearchButtonComponent,
    CategorySelectComponent,
    LocationInputComponent
  ]
})
export class AtomsModule {}
