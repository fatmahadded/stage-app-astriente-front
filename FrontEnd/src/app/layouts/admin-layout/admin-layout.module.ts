 import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { MaterialModule } from '../../material.module';


import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
import {AccueilComponent} from '../../accueil/accueil.component';
import {HistoriqueComponent} from '../../historique/historique.component';
import {RapportComponent} from '../../rapport/rapport.component';
import {RatingModule} from 'ng-starrating';
import {UserListComponent} from '../../user-list/user-list.component';
import {TokenInterceptor} from '../../token.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    RatingModule,
    MaterialModule,
  ],
  exports: [
  ],
  declarations: [
    RapportComponent,
    HistoriqueComponent,
    AccueilComponent,
    UserProfileComponent,
    NotificationsComponent,
    UserListComponent


  ]
})

export class AdminLayoutModule {}
