import  {GetService} from './services/get.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AccueilComponent } from './accueil/accueil.component';
import { HistoriqueComponent } from './historique/historique.component';
import { RapportComponent } from './rapport/rapport.component';
import { RatingModule } from 'ng-starrating';
import {AstreinteService} from './astreinte.service';
import { TestComponent } from './test/test.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
      BrowserModule,
    HttpClientModule,
    HttpModule,
    RatingModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    TestComponent


  ],
  providers: [AstreinteService, GetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
