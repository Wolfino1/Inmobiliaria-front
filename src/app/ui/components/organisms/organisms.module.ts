import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MoleculesModule } from '../molecules/molecules.module';
import { AdminTopbarComponent } from './admin-topbar/admin-topbar.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { PropertyCardComponent } from './property-card/property-card.component';

import { LucideAngularModule } from 'lucide-angular';
import {
  Info,
  Tag,
  Home,
  Users,
  Settings
} from 'lucide-angular';

@NgModule({
  declarations: [
    AdminTopbarComponent,
    PropertyCardComponent,
    AdminSidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
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
    AdminTopbarComponent,
    PropertyCardComponent,
    AdminSidebarComponent
  ]
})
export class OrganismsModule {}
