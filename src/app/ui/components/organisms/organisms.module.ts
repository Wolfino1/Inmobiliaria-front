import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MoleculesModule } from '../molecules/molecules.module';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { PropertyCardComponent } from './property-card/property-card.component';
import { LoginContainerComponent } from './login-container/login-container.component';
import { AuthCardComponent }      from './auth-card/auth-card.component';

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
    PropertyCardComponent,
    AdminSidebarComponent,
    LoginContainerComponent,
    AuthCardComponent
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
    PropertyCardComponent,
    AdminSidebarComponent,
    LoginContainerComponent,
    AuthCardComponent
  ]
})
export class OrganismsModule {}
