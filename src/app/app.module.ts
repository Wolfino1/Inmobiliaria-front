import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { RouterModule }         from '@angular/router';
import { HttpClientModule }     from '@angular/common/http';

import { AppComponent }         from './app.component';
import { HomeComponent }        from './ui/pages/home/home.component';
import { LoginComponent }       from './ui/pages/login/login.component';
import { CreateCategoryComponent } from './ui/pages/create-category/create-category.component';
import { CreateLocationComponent } from './ui/pages/create-location/create-location.component';

import { AtomsModule }          from './ui/components/atoms/atoms.module';
import { MoleculesModule }      from './ui/components/molecules/molecules.module';
import { OrganismsModule }      from './ui/components/organisms/organisms.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CreateCategoryComponent,
    CreateLocationComponent 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '',                 component: HomeComponent },
      { path: 'login',            component: LoginComponent },
      { path: 'categories',       component: CreateCategoryComponent },
      { path: 'locations/create', component: CreateLocationComponent  },
      { path: '**',               redirectTo: '' }
    ]),
    AtomsModule,
    MoleculesModule,
    OrganismsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


