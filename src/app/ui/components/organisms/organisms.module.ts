import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { MoleculesModule } from '../molecules/molecules.module';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { PropertyCardComponent } from './property-card/property-card.component';
import { LoginContainerComponent } from './login-container/login-container.component';
import { AuthCardComponent }      from './auth-card/auth-card.component';
import { CreateHouseComponent } from './create-house/create-house.component';
import { VisitsFormComponent }      from './visits-form/visits-form.component';
import { LucideAngularModule } from 'lucide-angular';
import {
  Info,
  Tag,
  Home,
  Users,
  Settings
} from 'lucide-angular';
import { HouseTableComponent } from './house-table/house-table.component';
import { SellerHouseTableComponent } from './seller-house-table/seller-house-table.component';
import { VisitsTableComponent } from './visits-table/visits-table.component';
import { ScheduleTableComponent } from './schedule-table/schedule-table.component';


@NgModule({
  declarations: [
    PropertyCardComponent,
    AdminSidebarComponent,
    LoginContainerComponent,
    AuthCardComponent,
    CreateHouseComponent,
    HouseTableComponent,
    SellerHouseTableComponent,
    VisitsFormComponent,
    VisitsTableComponent,
    ScheduleTableComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MoleculesModule,
    LucideAngularModule.pick({
      Info,
      Tag,
      Home,
      Users,
      Settings
    })
  ],
  exports: [
    PropertyCardComponent,
    AdminSidebarComponent,
    LoginContainerComponent,
    AuthCardComponent,
    CreateHouseComponent,
    HouseTableComponent,
    SellerHouseTableComponent,
    VisitsFormComponent,
    VisitsTableComponent,
    ScheduleTableComponent
  ]
})
export class OrganismsModule {}
