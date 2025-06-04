import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { RouterModule }         from '@angular/router';
import { HttpClientModule }     from '@angular/common/http';
import { ReactiveFormsModule }  from '@angular/forms';

import { AppComponent }         from './app.component';
import { HomeComponent }        from './ui/pages/home/home.component';
import { LoginComponent }       from './ui/pages/login/login.component';
import { RegisterComponent }    from './ui/pages/register/register.component';
import { CreateCategoryComponent } from './ui/pages/create-category/create-category.component';
import { CreateLocationComponent } from './ui/pages/create-location/create-location.component';
import { CreateHousePageComponent } from './ui/pages/create-house-page/create-house-page.component';
import { MyHousesPageComponent } from './ui/pages/my-houses/my-houses.component';
import { VisitsConfigComponent } from './ui/pages/visits-config/visits-config.component';
import { ScheduleVisitsComponent } from './ui/pages/schedule-visits/schedule-visits.component';



import { AtomsModule }          from './ui/components/atoms/atoms.module';
import { MoleculesModule }      from './ui/components/molecules/molecules.module';
import { OrganismsModule }      from './ui/components/organisms/organisms.module';

import { AuthGuard }            from './core/guards/auth.guard';
import { RoleGuard }            from './core/guards/role.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CreateCategoryComponent,
    CreateLocationComponent,
    CreateHousePageComponent,
    MyHousesPageComponent,
    VisitsConfigComponent,
    ScheduleVisitsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '',                 component: HomeComponent },
      { path: 'login',            component: LoginComponent },
      { path: 'register',         component: RegisterComponent },

      {
        path: 'categories',
        component: CreateCategoryComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { expectedRoles: ['ADMIN'] }
      },

      {
        path: 'locations/create',
        component: CreateLocationComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'houses/create',
        component: CreateHousePageComponent,
        canActivate: [AuthGuard],
        
      },

      {
      path: 'propiedades/mis-casas',
      component: MyHousesPageComponent,
      canActivate: [AuthGuard,RoleGuard],
      data: { expectedRoles: ['SELLER'] }
},
    {
        path: 'propiedades/gestionar-horarios/:houseId',
        component: VisitsConfigComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { expectedRoles: ['SELLER'] }
      },

        {
    path: 'schedule',
    component: ScheduleVisitsComponent,
    canActivate: [AuthGuard]
  },

      { path: '**',               redirectTo: '' }
    ]),
    AtomsModule,
    MoleculesModule,
    OrganismsModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
