import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AccueilComponent } from './accueil/accueil.component';
import { HistoriqueComponent } from './historique/historique.component';
import { RapportComponent } from './rapport/rapport.component';
import { RatingModule } from 'ng-starrating';
import {AstreinteService} from './astreinte.service';
import {LoaderService} from '../Service/loader.service';
import {LoaderComponent} from './loader/loader.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    RatingModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,

    LoaderComponent,


  ],
  providers: [AstreinteService,
                LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
