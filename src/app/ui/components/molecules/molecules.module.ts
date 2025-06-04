import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BottomBannerComponent } from './bottom-banner/bottom-banner.component';
import { SearchBannerComponent } from './search-banner/search-banner.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { LocationTableComponent } from './location-table/location-table.component';
import { LocationSearchComponent } from './location-search/location-search.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { HouseBasicInfoComponent } from './house-basic-info/house-basic-info.component';
import { HouseDetailsComponent } from './house-details/house-details.component';
import { HouseMetaComponent } from './house-meta/house-meta.component';

import { AtomsModule } from '../atoms/atoms.module';

@NgModule({
  declarations: [
    BottomBannerComponent,
    SearchBannerComponent,
    TopNavbarComponent,
    CategoryFormComponent,
    CategoriesTableComponent,
    LocationFormComponent,
    LocationTableComponent,
    LocationSearchComponent,
    LoginFormComponent,
    BasicLayoutComponent,
    HouseBasicInfoComponent,
    HouseDetailsComponent,
    HouseMetaComponent   
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AtomsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    BottomBannerComponent,
    SearchBannerComponent,
    TopNavbarComponent,
    CategoryFormComponent,
    CategoriesTableComponent,
    LocationFormComponent,
    LocationTableComponent,
    LocationSearchComponent,
    LoginFormComponent,
    BasicLayoutComponent,
    HouseBasicInfoComponent,
    HouseDetailsComponent,
    HouseMetaComponent    
  ]
})
export class MoleculesModule { }
